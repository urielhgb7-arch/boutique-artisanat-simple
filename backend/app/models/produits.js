const pool = require('../../config/db');

async function getAll() {
  const result = await pool.query('SELECT * FROM produits ORDER BY id');
  return result.rows;
}

async function getById(id) {
  const result = await pool.query('SELECT * FROM produits WHERE id = $1', [id]);
  return result.rows[0];
}

module.exports = { getAll, getById };