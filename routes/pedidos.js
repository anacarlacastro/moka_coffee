const express = require('express');
const router = express.Router();

// Rota para a página "pedidos"
router.get('/', (req, res) => {
  res.render('pedidos');  
});

module.exports = router;
