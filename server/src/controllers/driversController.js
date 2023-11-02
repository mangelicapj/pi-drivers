const axios = require('axios');
const { Driver, Team } = require('../db.js');
const { Sequelize, Op } = require('sequelize');

const API_EXTERNAL_URL = 'http://localhost:5000';

// Función para mapear los datos de un conductor de la API externa a los campos deseados
function mapApiDriver(apiDriver) {
  const {
    id,
    name: { forename, surname },
    description,
    image: { url },
    dob,
    nationality,
  } = apiDriver;

  return {
    id,
    name: {forename},
    surname:{surname},
    description,
    image: { url },
    dob,
    nationality,
  };
}
// Controlador para buscar todos los conductores
async function getAllDrivers(req, res) {
  try {
    const apiResponse = await axios.get(`${API_EXTERNAL_URL}/drivers`);
    const apiDrivers = apiResponse.data;

    const transformedApiDrivers = apiDrivers.map(mapApiDriver);

    return res.json(transformedApiDrivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener conductores' });
  }
}
// Controlador para buscar un conductor por id
async function getDriverById(req, res) {
  const { idDriver } = req.params;

  const source = !isNaN(idDriver) ? "api" : "base de datos";

  try {
    const driver = await getDriver(idDriver, source);

    if (!driver) {
      return res.status(404).json({ message: `No se encontró un conductor con el ID proporcionado en la fuente: ${source}.` });
    }

    return res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener el conductor por ID' });
  }
}

async function getDriver(id, source) {
  if (source === "api") {
    // Si la fuente es la API externa, busca en la API
    const response = await axios.get(`${API_EXTERNAL_URL}/drivers/${id}`);
    const apiDriver = response.data;
    return mapApiDriver(apiDriver);
  } else {
    // Si la fuente es la base de datos, busca en la base de datos
    const driver = await Driver.findByPk(id, { include: [{ model: Team }] });
    return driver;
  }
}
//controlador para buscar driver por nombre
async function searchDriversByName(req, res) {
  const { name } = req.query;

  try {
    // Buscar conductores en la API externa
    const apiResponse = await axios.get(`${API_EXTERNAL_URL}/drivers`);
    const apiDrivers = apiResponse.data;

    // Filtrar los conductores de la API por nombre
    const apiDriversFiltered = apiDrivers.filter(apiDriver => {
      return apiDriver.name.forename.toLowerCase().includes(name.toLowerCase());
    });

    // Buscar conductores en la base de datos
    const dbDrivers = await Driver.findAll({
      include: [{ model: Team }],
      where: {
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('name')),
            'LIKE',
            `%${name.toLowerCase()}%`
          ),
        ],
      },
      limit: 15,
    });

    // Combinar y enviar los resultados
    const combinedDrivers = [
      ...apiDriversFiltered.map(mapApiDriver),
      ...dbDrivers,
    ];

    if (combinedDrivers.length === 0) {
      return res.status(404).json({ message: "No se encontraron conductores con el nombre proporcionado." });
    }

    return res.status(200).json(combinedDrivers.slice(0, 15));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al buscar conductores por nombre." });
  }
}

// Controlador para crear un nuevo conductor y relacionarlo con equipos
const createDriver = async (req, res) => {
  const {
    name,
    surname,
    description,
    image,
    dob,
    nationality,
    teams // Puedes recibir un array de nombres de equipos
  } = req.body;

  try {
    // Primero, intenta crear el conductor
    const driver = await Driver.create({
      name,
      surname,
      description,
      image,
      dob,
      nationality,
    });

    // Luego, verifica y crea los equipos si no existen y almacena sus nombres en la tabla Teams
    for (const teamName of teams) {
      // Verifica si el equipo ya existe en la base de datos
      let team = await Team.findOne({ where: { name: teamName } });

      // Si el equipo no existe, créalo
      if (!team) {
        team = await Team.create({ name: teamName });
      }

      // Crea una relación entre el conductor y el equipo
      await driver.addTeam(team.id); // Usamos el "id" del equipo

      // Puedes también usar:
      // await driver.addTeam(team); // Si ya tienes el objeto del equipo
    }

    // Vuelve a relacionar el conductor con los equipos y devuelve la respuesta
    const updatedDriver = await Driver.findByPk(driver.id, { include: [{ model: Team }] });

    return res.status(201).json(updatedDriver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el conductor' });
  }
};

module.exports = {
  getAllDrivers,
  getDriverById,
  searchDriversByName,
  createDriver,
};