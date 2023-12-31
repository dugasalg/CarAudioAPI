var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




const mongoose = require('mongoose')
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var categoryRouter = require('./routes/categorias');
var favoriteRoutes = require('./routes/favorite');
var cotizacionesRouter = require('./routes/cotizaciones');
var carritoRouter = require('./routes/carrito')

const authRouter = require('./routes/auth');

// info db
const databaseURL = "mongodb+srv://9317:KJlc5A1q6KLWZN64@cluster0.srwwqwh.mongodb.net/"
mongoose.connect(databaseURL);
mongoose.connection.on('open', function(){
  console.log("Connection OK")
});


var app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/categorias', categoryRouter);
app.use('/favorite',favoriteRoutes)
app.use('/auth',authRouter);
app.use('/cotizacion', cotizacionesRouter);
app.use('/carrito', carritoRouter);



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

module.exports = app;