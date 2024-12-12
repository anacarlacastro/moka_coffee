const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db'); // Banco de dados

const firstPageRouter = require('./routes/firstPage');
const loginRouter = require('./routes/login');
const mokashopRouter = require('./routes/mokashop');
const cadastroRouter = require('./routes/cadastro');
const sobreNosRouter = require('./routes/sobreNos');
const perfilRouter = require('./routes/perfil');

const app = express();

// Configuração do EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas principais
app.use('/', firstPageRouter);
app.use('/login', loginRouter);
app.use('/mokashop', mokashopRouter);
app.use('/cadastro', cadastroRouter);
app.use('/sobreNos', sobreNosRouter);
app.use('/perfil', perfilRouter);

// Exemplo de pesquisa de produtos
app.get('/search', (req, res) => {
  const searchQuery = req.query.q;
  const sql = `SELECT * FROM produtos WHERE LOWER(nome) LIKE ?`;
  const params = [`%${searchQuery}%`];

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err.message);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
    res.json(rows);
  });
});

// Tratamento de erros 404
app.use((req, res, next) => {
  next(createError(404));
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
