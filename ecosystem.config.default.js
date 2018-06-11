/**
 * pm2 默认配置
 * @module ecosystem.config.default
 * @author bigfact
 * @see [pm2 官方配置项参考](@link http://pm2.keymetrics.io/docs/usage/application-declaration/)
 * @see [pm2 官方配置项参考（自动部署）](@link http://pm2.keymetrics.io/docs/usage/deployment/)
 */

module.exports = {
  /**
   * Application configuration section
   */
  apps: [
    // node application production
    {
      name: 'node',
      script: './node/app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 1123
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/error_file_dev.log',
      out_file: './logs/out_file_dev.log',
      pid_file: './pid/node.pid'
    },
    // node application development/testing
    {
      name: 'node.dev',
      script: './node/app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 1123
      },
      watch: ['./node/app.js', './node/socketio'],
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/error_file_dev.log',
      out_file: './logs/out_file_dev.log',
      pid_file: './pid/node.dev.pid'
    }
  ]
};
