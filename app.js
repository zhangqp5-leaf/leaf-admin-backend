var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { expressjwt: jwt } = require('express-jwt');
require('./config/global') // 根据不同环境设置通用配置
global.app = app

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 校验token
app.use(jwt({
  secret: global.servers.SECRET_KEY,
  algorithms: ['HS256'],
}).unless({
  path: ['/api/admin/base/open/captcha', '/api/admin/base/open/login', /^\/static\/.*/] //不需要token验证的请求
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log(2);
app.use('/api', require('./routes/login/login'));
app.use('/api', require('./routes/login/verifyCode'));
app.use('/api', require('./routes/login/currentUser'));
app.use('/api', require('./routes/login/logout'));

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
