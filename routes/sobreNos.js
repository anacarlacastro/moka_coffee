const express = require('express');
const router = express.Router();

// Rota para a página "Sobre nós"
router.get('/', (req, res) => {
  res.render('sobreNos');  // Renderiza o arquivo sobreNos.ejs
});

module.exports = router;
