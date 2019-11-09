const { Pool } = require('pg');

const pool = new Pool({
	host: '192.168.10.26',
	user: 'postgres',
	password: 'postgres',
	database: 'buberfy',
});

const getUsers = async (req, res) => {
	const response = await pool.query('SELECT * FROM usuarios');
	res.status(200).json({
		message: 'Usuarios retornados con exito',
		body: {
			user: [...response.rows],
		},
	});
};

const getUser = async (req, res) => {
	const { id_usuario } = req.params;
	const response = await pool.query(
		'SELECT * FROM usuarios WHERE id_usuario = $1',
		[id_usuario]
	);
	res.status(200).json({
		message: 'Usuario retornado con exito',
		body: {
			user: { ...response.rows[0] },
		},
	});
};

const addUser = async (req, res) => {
	const { nombre_usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`INSERT INTO usuarios 
    VALUES (
      DEFAULT, 
      $1,
      $2,
      $3,
      $4,
      $5      
    ) RETURNING *`,
		[nombre_usuario, password, nombre, mail, numero_contacto]
	);
	res.status(200).json({
		message: 'Usuario creado con exito',
		body: {
			user: { ...response.rows[0] },
		},
	});
};

const updateUser = async (req, res) => {
	const { id_usuario } = req.params;
	const { nombre_usuario, password, nombre, mail, numero_contacto } = req.body;
	const response = await pool.query(
		`UPDATE usuarios SET
      nombre_usuario = $2, 
      password = $3, 
      nombre = $4, 
      mail = $5, 
      numero_contacto = $6 
    WHERE id_usuario = $1
    RETURNING *`,
		[id_usuario, nombre_usuario, password, nombre, mail, numero_contacto]
	);
	res.status(200).json({
		message: 'Usuario actualizado con exito',
		body: {
			user: { ...response.rows[0] },
		},
	});
};

const deleteUser = async (req, res) => {
	const { id_usuario } = req.params;
	const response = await pool.query(
		'DELETE FROM usuarios WHERE id_usuario = $1',
		[id_usuario]
	);
	res.status(200).json({
		message: 'Usuario eliminado con exito',
		body: {},
	});
};

module.exports = {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
};
