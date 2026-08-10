const express = require('express');
const router = express.Router();
const { listerProduits, obtenirProduit } = require('../controllers/produitsController');

router.get('/', listerProduits);
router.get('/:id', obtenirProduit);

module.exports = router;