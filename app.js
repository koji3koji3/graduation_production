const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const auth = require('./routes/auth');
const index = require('./routes/index');
const users = require('./routes/users');
const report = require('./routes/report');

// var samplesRouter = require('./routes/samples');  



var app = express();

// view engine setup
// console.log(path.join(__dirname, 'views'));
// app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング
app.use('/', index);
app.use('/users', users);
app.use('/report', report);
app.use('/auth', auth)
// app.use('/samples', samplesRouter);

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
  res.render('error',{
    message:res.locals.message
  });
});

module.exports = app;
