const Produit = require('../models/produits');

async function listerProduits(req, res) {
  try {
    const produits = await Produit.getAll();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function obtenirProduit(req, res) {
  try {
    const produit = await Produit.getById(req.params.id);
    if (!produit) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(produit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listerProduits, obtenirProduit };