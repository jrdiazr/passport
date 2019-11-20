const { Router } = require("express");
const router = Router();
const {
	getDrivers,
	addDriver,
	getDriver,
	updateDriver,
	deleteDriver
} = require("../controllers/driverController");

router.get("/drivers", getDrivers);

router.get("/drivers/:id_conductor", getDriver);

router.post("/drivers", addDriver);

router.put("/drivers/:id_conductor", updateDriver);

router.delete("/drivers/:id_conductor", deleteDriver);

module.exports = router;
