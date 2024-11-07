const express = require('express');
const router = express.Router();

// Rota de exemplo para login
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;