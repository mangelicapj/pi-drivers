const { Router } = require("express");
const driversController = require("../controllers/driversController");
const teamsController = require("../controllers/teamsController");
const router = Router();

// Rutas relacionadas con los conductores
router.get("/drivers", driversController.getAllDrivers);
router.get("/drivers/id/:idDriver", driversController.getDriverById); // Ruta para buscar por ID
router.get("/drivers/name", driversController.searchDriversByName); // Ruta para buscar por nombre
router.post("/drivers", driversController.createDriver);

// Rutas relacionadas con los equipos
router.get('/teams', teamsController.getAllTeams);

module.exports = router;