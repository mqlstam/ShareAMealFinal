const mysql = require('mysql2');
const logger = require('./util/logger'); // We'll create this logger utility later
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  multipleStatements: true
};

const pool = mysql.createPool(dbConfig);

pool.on('connection', function (connection) {
  logger.trace(`Connected to database '${connection.config.database}' on '${connection.config.host}:${connection.config.port}'`);
});

module.exports = pool;