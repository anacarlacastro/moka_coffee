const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para listar os produtos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM produtos';

  db.all(query, (err, rows) => {
    console.log('Produtos retornados:', rows);  // Verifique o que está sendo retornado
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).send('Erro no servidor');
    } else {
      console.log('Produtos retornados:', rows);  // Verifique o que está sendo retornado
      res.render('mokashop', { produtos: rows });  // Renderize os dados atualizados
    }
  });
});
// Rota para verificar produtos duplicados
router.get('/produtos-duplicados', (req, res) => {
  const query = 'SELECT nome, COUNT(*) FROM produtos GROUP BY nome HAVING COUNT(*) > 1';

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Erro ao verificar produtos duplicados:', err);
      return res.status(500).send('Erro no servidor');
    }
    
    res.json(rows); // Retorna os produtos duplicados como resposta
  });
});

// Rota para remover duplicatas
router.get('/remover-duplicatas', (req, res) => {
  const query = `
    DELETE FROM produtos
    WHERE rowid NOT IN (
      SELECT MIN(rowid)
      FROM produtos
      GROUP BY nome
    );
  `;

  db.run(query, (err) => {
    if (err) {
      console.error('Erro ao remover duplicatas:', err);
      return res.status(500).send('Erro no servidor');
    }
    
    res.send('Duplicatas removidas com sucesso!');
  });
});

module.exports = router;