var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const db = require('./db'); //importando o banco de dados

var firstPageRouter = require('./routes/firstPage');
var loginRouter = require('./routes/login');
var mokashopRouter = require('./routes/mokashop');
var cadastroRouter = require('./routes/cadastro');
var sobreNosRouter = require('./routes/sobreNos');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Midleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rotas
app.use('/', firstPageRouter);
app.use('/login', loginRouter);
app.use('/mokashop', mokashopRouter);
app.use('/cadastro', cadastroRouter);
app.use('/sobreNos', sobreNosRouter);


// Rota para a pesquisa de produtos
app.get('/search', (req, res) => {
  const searchQuery = req.query.q;

// Query para buscar produtos no banco de dados
  const sql = `SELECT * FROM produtos WHERE LOWER(nome) LIKE ?`;
  const params = [`%${searchQuery}%`];

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Erro ao buscar produtos:", err.message);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }

// Retorna os resultados da busca
    res.json(rows);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// iniciar o servidor
const port = process.env.PORT || 3000;
console.log("Servidor iniciando...")
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;


