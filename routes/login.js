const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Conectar ao banco de dados
const db = new sqlite3.Database('./database.db');

// Rota para exibir a página de login
router.get('/', function (req, res) {
  res.render('login');
});

// Rota para processar o login
router.post('/', function (req, res) {
  const { email, password } = req.body;
  console.log('Dados recebidos:', email, password);

  // Buscar usuário pelo email
  db.get('SELECT * FROM users WHERE username = ?', [email], function (err, user) {
    if (err) {
      return res.status(500).send('Erro ao acessar o banco de dados');
    }

    // Se o usuário não for encontrado
    if (!user) {
      return res.status('login', { error: 'Usuário não encontrado' });
    }
    

    // Comparar a senha
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return res.status(500).send('Erro ao verificar a senha');
      }

      if (!isMatch) {
        return res.status(401).send('Senha incorreta');
      }

      // Se as credenciais estiverem corretas, redireciona para a página inicial
      res.redirect('/');  
    });
  });
});

module.exports = router;
