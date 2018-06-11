/**
 * socketio 服务
 * @module socketio
 * @author bigfact
 */

// 模块导入
var Message = require('../models/message');
var socketIoEvents = require('./events');
var socketIO = require('socket.io');
var utils = require('../utils/');

/**
 * 创建 socketio 服务
 * @param {Object} server node http 服务器实例
 */
module.exports = function(server) {
  // 创建 socketio 实例
  var io = socketIO(server);

  /**
   * socket动作监听
   */
  io.on(socketIoEvents.connection, function(socket) {
    // 用户连接成功
    // log
    console.log('a new socket %s connected.', socket.id);

    // 当前用户名标识
    socket.userno = '';

    /**
     * 用户登录
     */
    socket.on(socketIoEvents.login, function(data, callback) {
      // 记录当前用户名和socket实例的关系
      socket.userno = data.userno || '';

      // 回执函数
      callback = utils.getCallback(callback);

      // 加入以自己编号为名的房间
      socket.join(socket.userno, function() {
        // 触发登录成功
        callback({
          code: 0,
          data: null,
          message: ''
        });
        // log
        console.log('a new user %s (socket %s) logined.', socket.userno, socket.id);
      });
    });

    /**
     * 用户向某个用户发送一条消息
     */
    socket.on(socketIoEvents.message.new, function(data, callback) {
      // 新建消息
      var message = new Message('', data.from, data.to, data.content, '', 0, data.type);

      // 回执函数
      callback = utils.getCallback(callback);

      // 添加消息
      Message.insert(
        message,
        function(res) {
          res = res || {};
          res.data = res.data || {};
          res.data.message = Object.assign(data, message);
          // 向接收方所在的房间发送消息
          io.to(data.to).emit(socketIoEvents.message.new, res);
          // 回执发送状态
          callback(res);
          // log
          console.log('a new message %s from %s to %s.', data.content, data.from, data.to);
        }
      );
    });

    /**
     * 用户加入某个房间
     */
    socket.on(socketIoEvents.room.join, function(room, callback) {
      if (room) {
        // 回执函数
        callback = utils.getCallback(callback);
        // 加入以 room 参数值为名的房间
        socket.join(room, function() {
          // 回执加入成功
          callback({
            code: 0,
            data: null,
            message: ''
          });
          // log
          console.log('a user %s (socket %s) joined %s room.', socket.userno, socket.id, room);
        });
      }
    });

    /**
     * 用户离开某个房间
     */
    socket.on(socketIoEvents.room.leave, function(room, callback) {
      if (room) {
        // 回执函数
        callback = utils.getCallback(callback);
        // 离开以 room 参数值为名的房间
        socket.leave(room, function() {
          // 回执离开成功;
          callback({
            code: 0,
            data: null,
            message: ''
          });
          // log
          console.log('a user %s (socket %s) left %s room.', socket.userno, socket.id, room);
        });
      }
    });

    /**
     * 用户离线
     */
    socket.on(socketIoEvents.left, function() {
      console.log('a user %s (socket %s) left.', socket.userno, socket.id);
    });
  });

  return io;
};
