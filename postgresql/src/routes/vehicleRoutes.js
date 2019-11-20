const { Router } = require("express");
const router = Router();
const {
	getVehicles,
	addVehicle,
	getVehicle,
	updateVehicle,
	deleteVehicle
} = require("../controllers/vehicleController");

router.get("/vehicles", getVehicles);

router.get("/vehicles/:id_vehiculo", getVehicle);

router.post("/vehicles", addVehicle);

router.put("/vehicles/:id_vehiculo", updateVehicle);

router.delete("/vehicles/:id_vehiculo", deleteVehicle);

module.exports = router;
