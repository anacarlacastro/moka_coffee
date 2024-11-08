const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Rota para a página 'firstPage'
router.get('/', (req, res) => {
    res.render('firstPage', { title: 'First Page' });
});

// Rota de exemplo para registrar um usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
        if (err) {
            console.error("Erro ao registrar usuário:", err.message);
            res.status(500).send("Erro ao registrar usuário");
        } else {
            res.send("Usuário registrado com sucesso!");
        }
    });
});

module.exports = router;
