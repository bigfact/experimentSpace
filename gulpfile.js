var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var compass = require('gulp-compass');

var root = './';

/*******************************************************************************
 * src
 *******************************************************************************/
 
 var src = root + 'things/';

// 监听 scss 文件，自动编译 scss 文件
gulp.task('buildscss', function() {
    return gulp.watch(src + '**/**.scss')
        .on('change', function(path) {
            gulp.src(path)
                .pipe(compass({
                    // config_file: './config.rb',
                    css: path,
                    sass: path
                }));
        });
});

// 开发服务器任务
gulp.task('browser', function() {

    // 监听文件自动刷新
    watch([src + '**/**.js', src + '**/**.css', src + '**/**.html'], browserSync.reload);

    gulp.watch(src + '**/**.scss')
        .on('change', function(path) {
            gulp.src(path)
                .pipe(compass({
                    // config_file: './config.rb',
                    css: src,
                    sass: src
                })).on('error', function(err) {
                    console.log('sass Error!', err.message);
                    this.end();
                });
        });

    // 开发服务器
    return browserSync.init({
        server: {
            baseDir: root,
            //开启目录浏览
            directory: true
        },
        port: 4001,
        // startPath: './',
        //在这里你可以禁用/启用每个单独的功能
        // ghostMode: {
        //     clicks: true,
        //     forms: true,
        //     scroll: false
        // },
        //或使它们全部关闭，一气呵成
        ghostMode: false
    });
});

// 开启服务
gulp.task('default', gulp.series('browser'), function(callback) {
    callback();
});