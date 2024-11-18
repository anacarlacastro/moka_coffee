const sqlite3 = require('sqlite3').verbose(); //importando o módulo sqlite3 do node.js
//abre/cria um arquivo de banco de dados e cria duas tabelas
const db = new sqlite3.Database('./database.db', (err) => { //conexão com o banco de dados
    if (err) {
        console.error("Erro ao abrir o banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");//abaixo cria a tabela de usuários
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
    }
});

db.serialize(() => {//Abaixo cria a tabela de produtos
    db.run(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        imagem TEXT NOT NULL,
        descricao TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela:', err.message);
      } else {
        console.log('Tabela de produtos criada com sucesso.');
      }
    });
  });

  process.on('SIGINT', () => {
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco de dados:', err);
      } else {
        console.log('Banco de dados fechado com sucesso');
      }
      process.exit(0);
    });
  });
   
module.exports = db;
