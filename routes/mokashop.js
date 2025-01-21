const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/search', (req, res) => {
  const searchQuery = req.query.q.toLowerCase();  // Obtém a string de busca da URL

  // A consulta SQL busca produtos que contenham o termo de pesquisa no nome
  const query = 'SELECT * FROM produtos WHERE LOWER(nome) LIKE ?';
  
  db.all(query, [`%${searchQuery}%`], (err, rows) => {
      if (err) {
          console.error('Erro ao buscar produtos:', err);
          return res.status(500).send('Erro no servidor');
      }
      res.json(rows);  // Retorna os produtos encontrados em formato JSON
  });
});
function inserirProduto(nome, descricao, preco, imagem) {
  const insertQuery = 'INSERT INTO produtos (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)';
  db.run(insertQuery, [nome, descricao, preco, imagem], function (err) {
    if (err) {
      console.error('Erro ao adicionar produto:', err);
    } else {
      console.log(`Produto ${nome} adicionado com sucesso!`);
    }
  });
}


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


// Rota para adicionar um produto
router.post('/adicionar-produto', (req, res) => {
  const { nome, descricao, preco } = req.body;

  // Verificar se o produto já existe
  const checkQuery = 'SELECT COUNT(*) AS count FROM produtos WHERE nome = ?';

  db.get(checkQuery, [nome], (err, row) => {
    if (err) {
      console.error('Erro ao verificar produto:', err);
      return res.status(500).send('Erro no servidor');
    }

    // Se o produto já existir, não insere
    if (row.count > 0) {
      return res.status(400).send('Produto já existe');
    }

    // Caso o produto não exista, insere o novo produto
    const insertQuery = 'INSERT INTO produtos (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)';
    db.run(insertQuery, [nome, descricao, preco, imagem], function(err) {
      if (err) {
        console.error('Erro ao adicionar produto:', err);
        return res.status(500).send('Erro no servidor');
      }

      res.status(200).send('Produto adicionado com sucesso!');
    });
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
  if (!db) {
    return res.status(500).send('Banco de dados não conectado.');
  }
  
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
