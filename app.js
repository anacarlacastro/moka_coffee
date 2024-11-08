var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./db');

var firstPageRouter = require('./routes/firstPage');
var loginRouter = require('./routes/login');
var mokashopRouter = require('./routes/mokashop');
var cadastroRouter = require('./routes/cadastro');

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

// Conectar ao banco de dados ao iniciar o servidor
db.serialize(() => {
  console.log("Banco de dados pronto para uso.");
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
const port = process.env.PORT || 8080;
console.log("Servidor iniciando...")
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;


