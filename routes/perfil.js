const express = require('express');
const router = express.Router();

// Rota para a página "Perfil"
router.get('/', (req, res) => {
  res.render('perfil');  // Renderiza o arquivo Perfil.ejs
});

module.exports = router;
