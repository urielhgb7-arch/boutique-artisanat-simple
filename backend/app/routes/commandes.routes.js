const express = require('express');
const router = express.Router();
const { creerCommande } = require('../controllers/commandesController');

router.post('/', creerCommande);

module.exports = router;