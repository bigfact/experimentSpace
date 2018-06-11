/**
 * socketio 固定事件定义
 * @module socketio/events
 * @author bigfact
 */

module.exports = {
  // 客户端连接
  connection: 'connection',
  // 用户登录
  login: 'event.login',
  // 用户离线
  left: 'disconnect',
  // 消息
  message: {
    // 新消息
    new: 'event.message.new'
  },
  // 房间
  room: {
    // 加入
    join: 'event.room.join',
    // 离开
    leave: 'event.room.leave'
  }
};
