var gulp = require('gulp');
var browserSync = require('browser-sync').create()
var watch = require('gulp-watch');


var srcRoot = 'src/';

/*******************************************************************************
 * src
 *******************************************************************************/

gulp.task('browser', function () {

    // 监听文件自动刷新
    watch([srcRoot + '**'], browserSync.reload);

    return browserSync.init({
        server: {
            baseDir: "./",
            //开启目录浏览
            directory: true
        },
        port: 8081,
        startPath: srcRoot
    });
});

// 开启服务
gulp.task('default', gulp.series('browser'),
    function (callback) {
        callback();
    }
    );


/*******************************************************************************
 * dist
 *******************************************************************************/