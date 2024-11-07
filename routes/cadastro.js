const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Rota GET para exibir o formulário de cadastro
router.get('/', (req, res) => {
    res.render('cadastro');
});

// Rota POST para processar o cadastro
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Criptografar a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Inserir o novo usuário no banco de dados
        db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword], function(err) {
            if (err) {
                console.error("Erro ao cadastrar o usuário: ", err.message);
                res.status(500).json({ message: "Erro ao cadastrar o usuário." });
            } else {
                res.json({ message: "Usuário cadastrado com sucesso!" });
            }
        });
    } catch (error) {
        console.error("Erro ao cadastrar o usuário: ", error.message);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
});

module.exports = router;
