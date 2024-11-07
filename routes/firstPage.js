var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose(); // Adicionando o SQLite
const bcrypt = require('bcrypt'); // Para criptografar senhas

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados: ", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");

        // Criar a tabela de usuários se ela ainda não existir
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error("Erro ao criar a tabela de usuários: ", err.message);
            } else {
                console.log("Tabela de usuários verificada/criada com sucesso.");
            }
        });
    }
});

// Rota para a página firstPage como raiz
router.get('/', function(req, res, next) {
  res.render('firstPage', { title: 'First Page' });
});

module.exports = router;
