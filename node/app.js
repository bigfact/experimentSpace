/**
 * express 应用
 * @module node/app
 * @author bigfact
 */

// 导入依赖模块
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// socketio
var initSocketIO = require('./socketio');

// 端口和服务域名
var port = normalizePort(process.env.PORT || '1125');
var hostname = normalizePort(process.env.hostname || 'localhost');

// 创建 express 服务器实例
var app = express();
var server = http.createServer(app);

// 初始化 socketio
var io = initSocketIO(server);

// 请求体处理中间件
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error
  res.sendStatus(err.status || 500);
});

// 静态资源访问
app.use(express.static(path.join(__dirname, '../dist')));

// 服务器启动
server.listen(port, hostname, function() {
  console.log('Server listening at http://%s:%d', hostname, port);
});
server.on('error', onError);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
