var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

/*******************************************************************************
 * src
 *******************************************************************************/

gulp.task('browser', function () {

    // 监听文件自动刷新
    watch(['./**/**.js', './**/**.css', './**/**.html'], browserSync.reload);

    return browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 9080,
        startPath: './'
    });
});

// 开启服务
gulp.task('default', gulp.series('browser'), function (callback) {
    callback();
});


/*******************************************************************************
 * dist
 *******************************************************************************/
