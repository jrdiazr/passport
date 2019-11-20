const pool = require("../utils/dbConect");

const getDrivers = async (req, res) => {
	const response = await pool.query("SELECT * FROM t_conductor");
	res.status(200).json({
		message: "Conductores retornados con exito",
		body: {
			user: [...response.rows]
		}
	});
};

const getDriver = async (req, res) => {
	const { id_usuario } = req.params;
	const response = await pool.query(
		"SELECT * FROM t_conductor WHERE id_conductor = $1",
		[id_usuario]
	);
	res.status(200).json({
		message: "Conductor retornado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const addDriver = async (req, res) => {
	const { usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`INSERT INTO t_conductor 
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
		message: "Conductor creado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const updateDriver = async (req, res) => {
	const { id_usuario } = req.params;
	const { usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`UPDATE t_conductor SET
      usuario = $2, 
      password = $3, 
	  nombre = $4, 
	  appelido =$5
      mail = $6,       
    WHERE id_usuario = $1
    RETURNING *`,
		[id_usuario, nombre_usuario, password, nombre, apellido, mail]
	);
	res.status(200).json({
		message: "Conductor actualizado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const deleteDriver = async (req, res) => {
	const { id_usuario } = req.params;
	const response = await pool.query(
		"DELETE FROM t_conductor WHERE id_usuario = $1",
		[id_usuario]
	);
	res.status(200).json({
		message: "Usuario eliminado con exito",
		body: {}
	});
};

module.exports = {
	getDrivers,
	getDriver,
	addDriver,
	updateDriver,
	deleteDriver
};
