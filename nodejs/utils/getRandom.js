/**
 * 获取介于最小值和最大值之间的一个随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number} 介于最小值和最大值之间的一个随机数
 */
module.exports = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
