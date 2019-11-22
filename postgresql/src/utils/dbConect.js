const { Pool } = require('pg');

const pool = new Pool({
	host: '192.168.10.26',
	user: 'postgres',
	password: 'postgres',
	database: 'buberfy',
});

module.exports = pool;
