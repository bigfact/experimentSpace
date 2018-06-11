/**
 * 工具
 * @module utils
 * @author bigfact
 */

module.exports = {
  /**
   * 检查并获取回调函数
   * @param {Any} callback 回调函数
   * @returns js 方法
   */
  getCallback: function(callback) {
    return typeof callback === 'function' ? callback : function() {};
  }
};
