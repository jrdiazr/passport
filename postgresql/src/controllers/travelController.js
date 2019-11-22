const pool = require("../utils/dbConect");

const getVehicles = async (req, res) => {
	const response = await pool.query("SELECT * FROM t_vehiculo");
	res.status(200).json({
		message: "Vehiculos retornados con exito",
		body: {
			user: [...response.rows]
		}
	});
};

const getVehicle = async (req, res) => {
	const { id_vehiculo } = req.params;
	const response = await pool.query(
		"SELECT * FROM t_vehiculo WHERE id_vehiculo = $1",
		[id_vehiculo]
	);
	res.status(200).json({
		message: "Vehiculo retornado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const addVehicle = async (req, res) => {
	const { usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`INSERT INTO t_vehiculo 
    VALUES (
      DEFAULT, 
      $1,
      $2,
      $3,
      $4,
      $5      
    ) RETURNING *`,
		[usuario, password, nombre, apellido, mail]
	);
	res.status(200).json({
		message: "Vehiculo creado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const updateVehicle = async (req, res) => {
	const { id_vehiculo } = req.params;
	const { usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`UPDATE t_vehiculo SET
      usuario = $2, 
      password = $3, 
	  nombre = $4, 
	  appelido =$5
      mail = $6,       
    WHERE id_vehiculo = $1
    RETURNING *`,
		[id_vehiculo, nombre_usuario, password, nombre, apellido, mail]
	);
	res.status(200).json({
		message: "Vehiculo actualizado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const deleteVehicle = async (req, res) => {
	const { id_vehiculo } = req.params;
	const response = await pool.query(
		"DELETE FROM t_vehiculo WHERE id_vehiculo = $1",
		[id_vehiculo]
	);
	res.status(200).json({
		message: "Vehiculo eliminado con exito",
		body: {}
	});
};

module.exports = {
	getVehicles,
	getVehicle,
	addVehicle,
	updateVehicle,
	deleteVehicle
};
