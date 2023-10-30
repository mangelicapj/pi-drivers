const { Router } = require("express");
const driversController = require("../controllers/driversController");

const router = Router();

// Rutas relacionadas con los conductores
router.get("/drivers", driversController.getAllDrivers);
router.get("/drivers/:idDriver", driversController.getDriverById);
router.get("/drivers/name", driversController.searchDriversByName);
router.post("/drivers", driversController.createDriver);

// Rutas relacionadas con los equipos
router.get("/teams", driversController.getAllTeams);

module.exports = router;
