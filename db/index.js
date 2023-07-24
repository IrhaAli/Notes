// Database connection when server is started
if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const { Client } = require('pg');

const { PGHOST, PGUSER, PGPASSWORD, DB_NAME, PGPORT } = process.env;
const connObj = {
	user: PGUSER,
	host: PGHOST,
	password: PGPASSWORD,
	port: PGPORT,
	database: DB_NAME,
}

const db = new Client(connObj);

db.connect();

module.exports = db;