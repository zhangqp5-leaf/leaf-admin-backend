var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 中间件
const formatResponse = require('./middleware/formatResponse');
const verifyToken = require('./middleware/verifyToken');

require('./config/global') // 根据不同环境设置通用配置
global.app = app

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 校验token
// app.use(jwt({
//   secret: global.servers.SECRET_KEY,
//   algorithms: ['HS256'],
// }).unless({
//   // path: ['/api/admin/base/open/captcha', '/api/admin/base/open/login', /^\/static\/.*/] //不需要token验证的请求
//   path: [/^\/api\/.*/] //不需要token验证的请求
// }));

// static
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('@', express.static(path.join(__dirname)));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 中间件
app.use(formatResponse);
app.use(verifyToken);

app.use('/api', require('./routes/user/login'));
app.use('/api', require('./routes/user/verifyCode'));
app.use('/api', require('./routes/user/currentUser'));
app.use('/api', require('./routes/user/logout'));
app.use('/api', require('./routes/user/updatePerson'));
app.use('/api', require('./routes/fileSpace/classiFyList'));
app.use('/api', require('./routes/fileSpace/addClassify'));
app.use('/api', require('./routes/fileSpace/updateClassify'));
app.use('/api', require('./routes/fileSpace/deleteClassify'));
app.use('/api', require('./routes/fileSpace/fileList'));
app.use('/api', require('./routes/fileSpace/uploadFile'));
app.use('/api', require('./routes/fileSpace/addFile'));
app.use('/api', require('./routes/fileSpace/deleteFile'));
app.use('/api', require('./routes/home/getHomeData'));
app.use('/api', require('./routes/crud/getDemoUserList'));
app.use('/api', require('./routes/crud/addDemoUser'));
app.use('/api', require('./routes/crud/deleteDemoUser'));
app.use('/api', require('./routes/crud/updateDemoRule'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('err', err);
  res.status(err.status || 500).json({msg: err.msg});
});

module.exports = app;
