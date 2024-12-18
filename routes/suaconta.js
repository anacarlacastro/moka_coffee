const express = require('express');
const router = express.Router();

// Rota para a página "suaconta"
router.get('/', (req, res) => {
  res.render('suaconta');  // Renderiza o arquivo suaconta.ejs
});

module.exports = router;
