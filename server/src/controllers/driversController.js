const { Driver, Team } = require('../db.js');
const { Sequelize, Op } = require('sequelize');

// Controlador para obtener todos los conductores
async function getAllDrivers(req, res) {
  try {
    const drivers = await Driver.findAll({
      include: Team, 
    });
    return res.json(drivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener conductores' });
  }
}

// Controlador para obtener un conductor por ID
async function getDriverById(req, res) {
  try {
    const driver = await Driver.findByPk(req.params.idDriver, {
      include: Team, 
    });

    if (!driver) {
      return res.status(404).json({ error: 'Conductor no encontrado' });
    }

    return res.json(driver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener el conductor' });
  }
}

// Controlador para buscar conductores por nombre
async function searchDriversByName(req, res) {
  try {
    const searchName = req.query.name;
    if (!searchName) {
      return res.status(400).json({ error: 'Debes proporcionar un nombre de conductor para la búsqueda' });
    }

    const drivers = await Driver.findAll({
      where: {
        name: {
          [Op.iLike]: `%${searchName}%`, 
        },
      },
      include: Team, 
    });

    if (drivers.length === 0) {
      return res.status(404).json({ error: 'No se encontraron conductores con ese nombre' });
    }

    return res.json(drivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al buscar conductores por nombre' });
  }
}
// Controlador para crear un nuevo conductor
async function createDriver(req, res) {
  try {
    const newDriver = await Driver.create(req.body);

   return res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el conductor' });
  }
}

// Controlador para obtener todos los equipos
async function getAllTeams(req, res) {
  try {
    const teams = await Team.findAll();

    return res.json(teams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener equipos' });
  }
}

module.exports = {
  getAllDrivers,
  getDriverById,
  searchDriversByName,
  createDriver,
  getAllTeams,
};
  