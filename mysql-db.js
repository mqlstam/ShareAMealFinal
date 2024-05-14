

import dotenv from 'dotenv';
import mysql from 'mysql2';
import logger from './util/logger.js';

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || '2159021',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  multipleStatements: true
};

const pool = mysql.createPool(dbConfig);

pool.on('connection', function (connection) {
  logger.trace(`Connected to database '${connection.config.database}' on '${connection.config.host}:${connection.config.port}'`);
});

export default pool;