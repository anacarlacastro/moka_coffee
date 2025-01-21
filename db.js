const sqlite3 = require('sqlite3').verbose();

// Abre/cria um arquivo de banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");

        // Criação da tabela de usuários
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL

            )
        `, (err) => {
            if (err) {
                console.error("Erro ao criar a tabela de usuários:", err.message);
            } else {
                console.log("Tabela de usuários verificada/criada com sucesso.");
            }
        });

        // Criação da tabela de produtos
        db.run(`
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                preco REAL NOT NULL,
                imagem TEXT NOT NULL,
                descricao TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error("Erro ao criar tabela de produtos:", err.message);
            } else {
                console.log("Tabela de produtos criada com sucesso.");
            }
        });
    }
});

// Criar a tabela se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS mensagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        mensagem TEXT NOT NULL,
        data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// Fechar o banco de dados corretamente ao encerrar o processo
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar banco de dados:', err.message);
        } else {
            console.log('Banco de dados fechado com sucesso.');
        }
        process.exit(0);
    });
});

module.exports = db;