const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Conectar ao banco de dados
const db = new sqlite3.Database('./database.db');

// Rota para exibir a página de login
router.get('/', (req, res) => {
  res.render('login', { error: null }); // Renderiza a página de login sem mensagens de erro
});

// Rota para processar o login
router.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log('Dados recebidos:', email, password);

  // Buscar usuário pelo email
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [email], (err, user) => {
    if (err) {
      console.error('Erro ao acessar o banco de dados:', err.message);
      return res.render('login', { error: 'Erro interno no servidor' });
    }

    // Se o usuário não for encontrado
    if (!user) {
      return res.render('login', { error: 'Usuário não encontrado' });
    }

    // Comparar a senha
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erro ao verificar a senha:', err.message);
        return res.render('login', { error: 'Erro ao verificar a senha' });
      }

      if (!isMatch) {
        return res.render('login', { error: 'Senha incorreta' });
      }

      // Se as credenciais estiverem corretas, redireciona para a página inicial
      res.redirect('/');
    });
  });
});

module.exports = router;
