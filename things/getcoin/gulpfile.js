var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var compass = require('gulp-compass');

var css     =   'css/';
var sass    =   'sass/';
var js      =   'js/';
var imgs    =   'imgs/';

/*******************************************************************************
 * src
 *******************************************************************************/

var src     =   './src/';

// 编译 sass 文件函数
function buildSassFunc(path) {
    return gulp.src(path)
        .pipe(compass({
            css: src + css,
            sass: src + sass
        })).on('error', function(err) {
            console.log('sass Error!', err.message);
            this.end();
        });
}

// 编译 sass 文件
gulp.task('build-sass', function() {
    // buildSassFunc(src + '**/**.scss');
    return gulp.src(src + '**/**.scss')
        .pipe(compass({
            css: src + css,
            sass: src + sass
        })).on('error', function(err) {
            console.log('sass Error!', err.message);
            this.end();
        });
});

// 开发服务器任务
gulp.task('browser', function() {

    // 监听文件自动刷新
    gulp.watch([src + '**/**.js', src + '**/**.css', src + '**/**.html']).on('change', function() {
        browserSync.reload();
    });

    // 监听 scss 文件，自动编译 scss 文件
    gulp.watch(src + '**/**.scss')
        .on('change', function(path) {
            buildSassFunc(path);
        });

    // 开发服务器
    return browserSync.init({
        server: {
            baseDir: src,
            //开启目录浏览
            directory: true
        },
        port: 3000,
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

var clean = require('gulp-clean');

var dist = './dist/';

// 清除 dist 目录文件
gulp.task('clean', function() {
    return gulp.src(dist)
    
});