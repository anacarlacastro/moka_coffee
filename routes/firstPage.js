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

// Rota para processar os dados do formulário
router.post("/contato", (req, res) => {
    console.log("Formulário enviado:", req.body);  // Verificar se os dados estão sendo recebidos
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const query = `INSERT INTO mensagens (nome, email, mensagem) VALUES (?, ?, ?)`;
    db.run(query, [nome, email, mensagem], function (err) {
        if (err) {
            console.error("Erro ao salvar mensagem no banco de dados:", err.message);
            return res.status(500).send("Erro ao processar sua solicitação.");
        }
        console.log(`Mensagem salva com ID: ${this.lastID}`);
        res.json({ sucesso: true, mensagem: "Recebemos sua mensagem. Obrigada por falar conosco!" });
    });
});

module.exports = router;
