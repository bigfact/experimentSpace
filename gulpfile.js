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
            baseDir: "./",
            //开启目录浏览
            directory: true
        },
        port: 9080,
        startPath: './',
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
gulp.task('default', gulp.series('browser'), function (callback) {
    callback();
});


/*******************************************************************************
 * dist
 *******************************************************************************/
