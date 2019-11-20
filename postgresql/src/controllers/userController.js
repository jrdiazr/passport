const pool = require("../utils/dbConect");

const getUsers = async (req, res) => {
	const response = await pool.query("SELECT * FROM t_usuario");
	res.status(200).json({
		message: "Usuarios retornados con exito",
		body: {
			user: [...response.rows]
		}
	});
};

const getUser = async (req, res) => {
	const { id_usuario } = req.params;
	const response = await pool.query(
		"SELECT * FROM t_usuario WHERE id_usuario = $1",
		[id_usuario]
	);
	res.status(200).json({
		message: "Usuario retornado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const addUser = async (req, res) => {
	const { usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`INSERT INTO t_usuario 
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
		message: "Usuario creado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const updateUser = async (req, res) => {
	const { id_usuario } = req.params;
	const { usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`UPDATE t_usuario SET
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
		message: "Usuario actualizado con exito",
		body: {
			user: { ...response.rows[0] }
		}
	});
};

const deleteUser = async (req, res) => {
	const { id_usuario } = req.params;
	const response = await pool.query(
		"DELETE FROM t_usuario WHERE id_usuario = $1",
		[id_usuario]
	);
	res.status(200).json({
		message: "Usuario eliminado con exito",
		body: {}
	});
};

module.exports = {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser
};
