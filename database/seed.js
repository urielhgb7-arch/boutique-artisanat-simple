const pool = require('../backend/config/db.js');

const produits = [
  { nom: 'Panier tressé moyen', prix: 8500, photo_url: 'https://images.unsplash.com/...', stock: 12 },
  { nom: 'Collier perles traditionnelles', prix: 5000, photo_url: 'https://images.unsplash.com/...', stock: 20 },
  // ... complète jusqu'à 8-10 produits
];

async function seed() {
  for (const p of produits) {
    await pool.query(
      'INSERT INTO produits (nom, prix, photo_url, stock) VALUES ($1, $2, $3, $4)',
      [p.nom, p.prix, p.photo_url, p.stock]
    );
  }
  console.log('Seed terminé');
  process.exit(0);
}

seed();