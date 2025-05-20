var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');

var app = express();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares para logs, parseo y archivos estáticos
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de autorización con API Key simple
app.use((req, res, next) => {
  const apiKey = req.headers.authorization;
  if (apiKey && apiKey === '123') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Missing or invalid API key' });
  }
});

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// Captura 404 y pasa al handler de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores general
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
