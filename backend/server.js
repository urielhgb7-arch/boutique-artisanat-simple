// server.js — en haut, avant tout le reste
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));