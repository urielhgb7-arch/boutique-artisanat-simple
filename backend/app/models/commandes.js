const pool = require('../../config/db');

async function creerCommande(clientId, items) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Recalcule les prix depuis la table produits — ne jamais faire confiance
    // au prix envoyé par le frontend
    let total = 0;
    const itemsAvecPrix = [];
    for (const item of items) {
      const produit = await client.query('SELECT prix, stock FROM produits WHERE id = $1', [item.produit_id]);
      if (produit.rows.length === 0) throw new Error(`Produit ${item.produit_id} introuvable`);
      const prixUnitaire = produit.rows[0].prix;
      total += prixUnitaire * item.quantite;
      itemsAvecPrix.push({ ...item, prix_unitaire: prixUnitaire });
    }

    const commande = await client.query(
      'INSERT INTO commandes (client_id, total) VALUES ($1, $2) RETURNING *',
      [clientId, total]
    );
    const commandeId = commande.rows[0].id;

    for (const item of itemsAvecPrix) {
      await client.query(
        'INSERT INTO commande_items (commande_id, produit_id, quantite, prix_unitaire) VALUES ($1, $2, $3, $4)',
        [commandeId, item.produit_id, item.quantite, item.prix_unitaire]
      );
    }

    await client.query('COMMIT');
    return commande.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { creerCommande };