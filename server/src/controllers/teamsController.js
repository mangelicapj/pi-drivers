const axios = require('axios');
const { Team } = require('../db.js');
const { Sequelize } = require('sequelize');

const API_EXTERNAL_URL = 'http://localhost:5000';

async function getAllTeams(req, res) {
  try {
    // Obtener los conductores de la API externa
    const apiResponse = await axios.get(`${API_EXTERNAL_URL}/drivers`);
    const apiDrivers = apiResponse.data;

    if (!Array.isArray(apiDrivers)) {
      return res.status(404).json({ message: 'No se encontraron conductores en la API.' });
    }

    // Extraer equipos únicos de los datos de la API
    const teamsFromAPI = new Set();

    apiDrivers.forEach((driver) => {
      if (driver && driver.teams) {
        const driverTeams = driver.teams.split(',').map((team) => team.trim());
        driverTeams.forEach((team) => teamsFromAPI.add(team));
      }
    });

    // Filtrar los equipos que ya existen en la base de datos local
    const existingTeams = await Team.findAll({ where: { name: Array.from(teamsFromAPI) } });
    const existingTeamNames = existingTeams.map((team) => team.name);

    // Crear un array de nuevos equipos que no se encuentran en la base de datos local
    const newTeams = Array.from(teamsFromAPI).filter((team) => !existingTeamNames.includes(team));

    // Si hay nuevos equipos, insértalos en la base de datos local
    if (newTeams.length > 0) {
      const createdTeams = await Team.bulkCreate(newTeams.map((name) => ({ name })));
      return res.status(201).json(createdTeams);
    }

    // Responder con la lista de todos los equipos (incluyendo los existentes)
    const allTeams = await Team.findAll();
    return res.json(allTeams);
  } catch (error) {
    // Registrar errores
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error al obtener y almacenar equipos desde la API.' });
  }
}


module.exports = {
  getAllTeams,
};
