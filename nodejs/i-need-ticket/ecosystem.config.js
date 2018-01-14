/**
 * pm2 配置文件
 */
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // app.mgs.mgw.get
    {
      name: 'app.mgs.mgw.get',
      script: './app.mgs.mgw.get.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'development'
      },
      watch: ['app.mgs.mgw.get.js'],
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z',
      error_file: './.tmp/logs/error_file.log',
      out_file: './.tmp/logs/out_file.log'
    }
  ]
}
