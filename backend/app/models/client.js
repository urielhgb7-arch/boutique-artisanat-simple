const pool = require('../../config/db');

async function findOrCreate(nom, contact) {
  const existing = await pool.query('SELECT * FROM clients WHERE contact = $1', [contact]);
  if (existing.rows.length > 0) {
    return existing.rows[0];
  }
  const inserted = await pool.query(
    'INSERT INTO clients (nom, contact) VALUES ($1, $2) RETURNING *',
    [nom, contact]
  );
  return inserted.rows[0];
}

module.exports = { findOrCreate };