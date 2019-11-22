const pool = require('../utils/dbConect');

const getUserTravels = async (req, res) => {
	const { id_usuario } = req.params;
	const response = await pool.query(
		"SELECT lat_origen as originLat, lon_origen as originLng, lat_destino as destinationLat, lon_destino as destinationLng, valor_pagar as estimateRate, direccion_origen as origin, direccion_destino as destino, tipo_viaje as tipoviaje, 0::int8 as distance, extract('minutes' from (now() - '2019-11-22 11:55:33.43298-05')) as duration FROM t_viaje WHERE id_usuario = $1",
		[id_usuario]
	);
	res.status(200).json({
		message: 'Viajes retornados con exito',
		body: {
			travels: [...response.rows],
		},
	});
};

const getTravel = async (req, res) => {
	const { id_viaje } = req.params;
	const response = await pool.query(
		'SELECT * FROM t_viaje WHERE id_viaje = $1',
		[id_viaje]
	);
	res.status(200).json({
		message: 'Viaje retornado con exito',
		body: {
			user: { ...response.rows[0] },
		},
	});
};

const addTravel = async (req, res) => {
	const {
		id_usuario,
		lat_origen,
		lon_origen,
		lat_destino,
		lon_destino,
		id_metodo_pago,
		valor_pagar,
		estado,
		direccion_origen,
		direccion_destino,
		tipo_viaje,
	} = req.body;
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
		message: 'Vehiculo creado con exito',
		body: {
			user: { ...response.rows[0] },
		},
	});
};

const updateTravel = async (req, res) => {
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
		message: 'Vehiculo actualizado con exito',
		body: {
			user: { ...response.rows[0] },
		},
	});
};

const deleteTravel = async (req, res) => {
	const { id_vehiculo } = req.params;
	const response = await pool.query(
		'DELETE FROM t_vehiculo WHERE id_vehiculo = $1',
		[id_vehiculo]
	);
	res.status(200).json({
		message: 'Vehiculo eliminado con exito',
		body: {},
	});
};

module.exports = {
	getUserTravels,
};
