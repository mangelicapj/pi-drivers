const axios = require('axios');
const { Driver, Team } = require('../db.js');
const { Sequelize, Op } = require('sequelize');

const API_BASE_URL = 'http://localhost:5000'; 

// Controlador para obtener todos los conductores
async function getAllDrivers(req, res) {
  try {
    const response = await axios.get(`${API_BASE_URL}/drivers`);
    const apiDrivers = response.data;

    // Obtener los conductores locales
    const localDrivers = await Driver.findAll();

    // Combinar los conductores locales y de la API
    const allDrivers = [...apiDrivers, ...localDrivers];

    return res.json(allDrivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener conductores' });
  }
}

// Controlador para obtener un conductor por ID
async function getDriverById(req, res) {
  const driverId = req.params.idDriver;
  try {
    const response = await axios.get(`${API_BASE_URL}/drivers/${driverId}`);
    const driver = response.data;

    return res.json(driver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener el conductor por ID' });
  }
}

// Controlador para buscar conductores por nombre
async function searchDriversByName(req, res) {
  const searchName = req.query.name;
  try {
    const response = await axios.get(`${API_BASE_URL}/drivers?name.forename=${searchName}`);
    const drivers = response.data;
    return res.json(drivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al buscar conductores por nombre' });
  }
}
// Controlador para crear un nuevo conductor y relacionarlo con equipos
async function createDriver(req, res) {
  const { name, surname, description, image, dob, nationality, teams } = req.body;

  try {
    // Crear el conductor en la base de datos local
    const newDriver = await Driver.create({
      name,
      surname,
      description,
      image,
      dob,
      nationality,
    });

    // Buscar y asociar los equipos al conductor
    if (teams && teams.length > 0) {
      const teamsToAssociate = await Team.findAll({ where: { name: teams } });
      if (teamsToAssociate) {
        await newDriver.setTeams(teamsToAssociate);
      }
    }

    return res.json(newDriver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el conductor' });
  }
}

// Controlador para obtener todos los equipos de la API externa y almacenarlos en la base de datos local
async function getAllTeams(req, res) {
  try {
    // Consultar la base de datos local para verificar si los equipos ya están almacenados
    const localTeams = await Team.findAll();

    if (localTeams && localTeams.length > 0) {
      return res.json(localTeams);
    } else {
      // Realizar una solicitud a la API externa para obtener los equipos
      const response = await axios.get(`${API_BASE_URL}/teams`);
      const apiTeams = response.data;

      // Almacenar los equipos en la base de datos local
      await Team.bulkCreate(apiTeams);

      return res.json(apiTeams);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener y almacenar equipos' });
  }
}

module.exports = {
  getAllDrivers,
  getDriverById,
  searchDriversByName,
  createDriver,
  getAllTeams,
};