import mysql from 'mysql2';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connection = mysql.createConnection({
  host: '127.0.0.1', // Replace with your database host
  user: 'share-a-meal-user', // Replace with your database user
  password: 'secret', // Replace with your database password
  database: 'share-a-meal-testdb', // Replace with your database name
});

async function runCleanup() {
  const cleanupSql = await readFile(path.join(__dirname, 'cleanup.sql'), 'utf8');

  connection.connect();

  connection.query(cleanupSql, (error, results) => {
    if (error) throw error;
    console.log('Database cleanup completed');
    connection.end();
  });
}

runCleanup();
