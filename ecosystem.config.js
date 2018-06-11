/**
 * pm2 读取的配置文件
 * @module ecosystem.config
 * @author bigfact
 */

var config = require('./ecosystem.config.default');
try {
  config = require('./ecosystem.config.local');
} catch (err) {}

module.exports = config;
