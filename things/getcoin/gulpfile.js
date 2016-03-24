var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// var watch = require('gulp-watch');
var compass = require('gulp-compass');

/*******************************************************************************
 * src
 *******************************************************************************/

// 编译 sass 文件
gulp.task('build-sass', function() {
    return gulp.src('./**/**.scss')
        .pipe(compass({
            css: './css/',
            sass: './sass/'
        })).on('error', function(err) {
            console.log('sass Error!', err.message);
            this.end();
        });
});

// 开发服务器任务
gulp.task('browser', function() {

    // 监听文件自动刷新
    // watch(['./**.js', './**.css', './**.html'], browserSync.reload);
    gulp.watch(['./**/**.js', './**/**.css', './**/**.html']).on('change', function() {
        browserSync.reload();
    });

    // 监听 scss 文件，自动编译 scss 文件
    gulp.watch('./**/**.scss')
        .on('change', function(path) {
            gulp.src(path)
                .pipe(compass({
                    css: './css/',
                    sass: './sass/'
                })).on('error', function(err) {
                    console.log('sass Error!', err.message);
                    this.end();
                });
        });

    // 开发服务器
    return browserSync.init({
        server: {
            baseDir: "./",
            //开启目录浏览
            directory: true
        },
        port: 4001,
        ghostMode: false
    });
});

// 开启服务
gulp.task('default', gulp.series('build-sass', 'browser'), function(callback) {
    callback();
});


/*******************************************************************************
 * dist
 *******************************************************************************/
