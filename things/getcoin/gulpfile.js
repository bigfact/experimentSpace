var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var compass = require('gulp-compass');
var watch = require('gulp-watch');

var css = 'css/';
var sass = 'sass/';
var js = 'js/';
var imgs = 'imgs/';

/*******************************************************************************
 * src
 *******************************************************************************/

var src = './src/';

// 编译 sass 文件
gulp.task('build-sass', function () {
    return gulp.src(src + '**/*.scss')
        .pipe(compass({
            css: src + css,
            sass: src + sass
        })).on('error', function (err) {
            console.log('sass Error!', err.message);
            this.end();
        });
});

// 开发服务器任务
gulp.task('browser', function () {

    // 监听文件自动刷新
    watch([src + '**/*.js', src + '**/*.css', src + '**/*.html'], browserSync.reload);

    // 监听 scss 文件，自动编译 scss 文件
    // gulp.watch(src + '**/*.scss')
    //     .on('change', function (path) {
    //         gulp.src(path)
    //             .pipe(compass({
    //                 css: src + css,
    //                 sass: src + sass
    //             })).on('error', function (err) {
    //                 console.log('sass Error!', err.message);
    //                 this.end();
    //             });
    //     });
    
    watch([src + '**/*.scss'], gulp.series('build-sass'));

    // 开发服务器
    return browserSync.init({
        server: {
            baseDir: './',
            //开启目录浏览
            directory: true
        },
        port: 3000,
        ghostMode: false
    });
});

// 开启服务
gulp.task('default', gulp.series('build-sass', 'browser'), function (callback) {
    callback();
});


/*******************************************************************************
 * dist
 *******************************************************************************/

var clean = require('gulp-clean');
var cleancss = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglifyjs = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var dist = './dist/';
var revd = './rev/';

// 清除 dist 目录文件
gulp.task('clean', function () {
    return gulp.src(dist, { read: false })
        .pipe(clean());
});

// 复制 img 文件，并给 img 文件打版本号
gulp.task('copy-imgs', function () {
    return gulp.src(src + imgs + '*')
    // .pipe(rev())
        .pipe(gulp.dest(dist + imgs))
    // .pipe(rev.manifest())
    // .pipe(gulp.dest(revd + imgs))
        ;
});

// 丑化 js 文件
gulp.task('uglifyjs', function () {
    return gulp.src(src + js + '**/*.js')
        .pipe(gulp.dest(dist + js))
    // 丑化
        .pipe(uglifyjs())
    // 重命名
    // .pipe(rename({ suffix: '.min' }))
    // 计算 hash
    // .pipe(rev())
    // 发布到 dist
        .pipe(gulp.dest(dist + js))
    // // 生成列表
    // .pipe(rev.manifest())
    // // 列表发布到 rev
    // .pipe(gulp.dest(revd + js))
        ;
});

// 压缩 css 文件
gulp.task('cleancss', function () {
    return gulp.src(src + css + '**/*.css')
        .pipe(gulp.dest(dist + css))
        .pipe(cleancss())
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(rev())
        .pipe(gulp.dest(dist + css))
    // .pipe(rev.manifest())
    // .pipe(gulp.dest(revd + css))
        ;
});

// // css 替换链接文件，并给 css 文件打版本号
// gulp.task('cssrevc', function() {
//     return gulp.src([rev + '**', dist + css + '**'])
//         .pipe(revCollector())
//         .pipe(rev())
//         .pipe(gulp.dest(dist + css))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest(revd + css));
// });

// 复制 html 文件，并替换链接
gulp.task('copy-html', function () {
    return gulp.src(src + '*.html')
        .pipe(gulp.dest(dist));
});

// 发布任务
gulp.task('dist', gulp.series(
    'clean',
    'copy-html',
    'copy-imgs',
    'build-sass',
    'cleancss',
    'uglifyjs'
    ));