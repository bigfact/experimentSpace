/**
 * Message module
 * @module Message
 */

// 检查工具
var checkCbFunction = require('../utils/').getCallback;

/**
 * @constructor 消息
 * @param {Number}  id - 消息唯一标识
 * @param {String}  from - 消息来源（发送方的唯一标识）
 * @param {String}  to - 消息去向（接收方的唯一标识）
 * @param {String}  content - 消息内容（经过encodeURIComponent编码）
 * @param {Date}    createAt - 消息发生时间
 * @param {Number}  read - 消息是否已读
 * @param {String}  type - 消息类型
 */
function Message(id, from, to, content, createAt, read, type) {
  this.id = id || '';
  this.from = from || '';
  this.to = to || '';
  this.content = encodeURIComponent(content || '');
  this.createAt = createAt || new Date();
  this.read = read === 0 ? 0 : 1;
  this.type = type || '';
}

/**
 * 更新消息
 * @param {Object} message - 消息
 */
Message.prototype.update = function(message) {
  this.id = message.id || this.id || '';
  this.from = message.from || this.from || '';
  this.to = message.to || this.to || '';
  this.content = message.content || this.content || '';
  this.createAt = message.createAt || this.createAt || new Date();
  this.read = message.read === 0 ? 0 : this.read;
  this.type = message.type || this.type || '';
};

/**
 * 添加一条消息
 * @param {Message|Object} message - 消息
 * @param {insert~callback} callback - 添加完成回调函数
 * @todo 添加记录消息逻辑
 */
Message.insert = function(message, callback, token) {
  callback = checkCbFunction(callback);
};
/**
 * 添加完成回调函数
 * @callback insert~requestCallback
 * @param {Object} message - 一条消息的实例
 */

module.exports = Message;
