var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { getAllRouteDirs } = require('./utils/utils');
const { Server } = require('socket.io');
const createSocketConnection = require('./socket');

// 中间件
const formatResponse = require('./middleware/formatResponse');
const getDbConnection = require('./middleware/getDbConnection');
const verifyToken = require('./middleware/verifyToken');

require('./config/global') // 根据不同环境设置通用配置
global.app = app

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('@', express.static(path.join(__dirname)));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 中间件
app.use(formatResponse);
app.use(getDbConnection);
app.use(verifyToken);

// 路由
for (const dir of getAllRouteDirs()) {
  app.use('/api', require(dir));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.jsonFail(404, 'Sorry cant find that!');
});

// error handler
app.use(function(err, req, res, next) {
  // console.log('err', err);
  res.status(err.status || 500).json({msg: err.msg});
});

const io = new Server(1921, {
  cors: {
    origin: ['http://localhost:8000'],
    credentials: true
  }
});
createSocketConnection(io);

module.exports = app;
