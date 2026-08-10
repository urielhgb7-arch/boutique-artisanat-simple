const Client = require('../models/client');
const Commande = require('../models/commandes');

async function creerCommande(req, res) {
  try {
    const { client, items } = req.body;
    if (!client?.nom || !client?.contact || !items?.length) {
      return res.status(400).json({ error: 'Données incomplètes' });
    }
    const clientRow = await Client.findOrCreate(client.nom, client.contact);
    const commande = await Commande.creerCommande(clientRow.id, items);
    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { creerCommande };