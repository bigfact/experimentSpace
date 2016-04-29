var gulp     = require('gulp');
var clean    = require('gulp-clean');
var rename   = require('gulp-rename');
var uglify   = require('gulp-uglify');
var distRoot = 'dist/';
var srcRoot  = 'src/';

// 清空dist目录
gulp.task('cleandist', function() {
    return gulp.src(distRoot, { read: false })
        .pipe(clean());
});

// 复制js文件到dist目录
gulp.task('copyjs', function() {
    return gulp.src([srcRoot + '**/*.js'])
        .pipe(gulp.dest(distRoot));
});

// 压缩js文件
gulp.task('bulidjs', function() {
    return gulp.src([distRoot + '**/*.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(distRoot));
});

// 开启发布任务
gulp.task('default', gulp.series(
    'cleandist',
    'copyjs',
    'bulidjs'
));
