var gulp = require('gulp');

var root = './';

// *******
// 
// src
// 
// *******

var browserSync = require('browser-sync').create()
var watch = require('gulp-watch');

var srcRoot = root + 'src/';

gulp.task('browser', function() {

  // 监听文件自动刷新
  watch([root + '**/*.html', root + '**/*.js'], browserSync.reload);

  return browserSync.init({
    server: {
      baseDir: root,
      directory: true
    },
    port: 9080,
    startPath: root + 'examples/'
  });
});

// 开启服务
gulp.task('default', gulp.series('browser'),
  function(callback) {
    callback();
  }
);

// *******
// 
// dist
// 
// *******

var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var distRoot = root + 'dist/';

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

gulp.task('dist', gulp.series(
  'cleandist',
  'copyjs',
  'bulidjs'
));
