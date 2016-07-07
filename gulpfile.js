/**
 * @version 1.4.1
 * @author bigfact
 * @date 2016.3.18
 */

/**
 * gulp
 */
var gulp = require('gulp');

/**
 * 文件流操作
 */
var through = require('through2');

/**
 * 路径处理对象
 */
var path = require('path');

/**
 * 根路径
 */
var root = './';

/**
 * 开发任务
 */

/**
 * 源文件目录
 */
var src = root + 'things/';

/**
 * 编译 sass 文件
 */
gulp.task('sass', function () {
	return gulp.src(src + '**/**.scss')
		.pipe(through.obj(function collectRevs(file, enc, cb) {
			func_sass(path.relative(root, file.path));
			cb();
		}));
});

/**
 * 开发服务器加载
 */
var browserSync = require('browser-sync').create();

/**
 * 开发服务器任务、文件监听
 */
gulp.task('browser', function () {

	// 监听文件自动刷新
	gulp.watch([src + '**/**.js', src + '**/**.html'], browserSync.reload);

	// 监听 css 文件改变，并注入到客户端
	gulp.watch(src + '**/**.css')
		.on('add', function (path) {
			console.log('File ' + path + ' was added');
			inject_css(path);
		})
		.on('change', function (path, stats) {
			console.log('File ' + path + ' was changed');
			inject_css(path);
		})
		.on('unlink', function (path) {
			console.log('File ' + path + ' was removed');
			inject_css(path);
		});

	// 监听 sass 文件，自动编译
	gulp.watch(src + '**/**.scss')
		.on('add', function (path) {
			console.log('File ' + path + ' was added');
			func_sass(path);
		})
		.on('change', function (path, stats) {
			console.log('File ' + path + ' was changed');
			func_sass(path);
		})
		.on('unlink', function (path) {
			console.log('File ' + path + ' was removed');
		});

	// 开发服务器
	return browserSync.init({
		server: {
			baseDir: root,
			//开启目录浏览
			directory: true
		},
		port: 4001,
		startPath: src,
		// 禁用、启用每个单独的功能
		// ghostMode: {
		//     clicks: true,
		//     forms: true,
		//     scroll: false
		// },
		// 禁用操作同步
		ghostMode: false
	});

});

/**
 * 开启开发任务
 */
gulp.task('debug', gulp.series('sass', 'browser'), function (cb) {
	cb();
});

/**
 * 发布任务
 */

/**
 * 发布目录
 */
var dist = src;

/**
 * 文件重命名插件
 */
var rename = require('gulp-rename');

/**
 * js 压缩器
 */
var uglify = require('gulp-uglify');

/**
 * js 文件处理
 */
gulp.task('js', function () {
	return gulp.src([src + '**/**.js', '!' + src + '**/**.min.js'])
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist));
});

/**
 * css 压缩器
 */
var cssnano = require('gulp-cssnano');

/**
 *  css 文件处理
 */
gulp.task('css', function () {
	return gulp.src([src + '**/**.css', '!' + src + '**/**.min.css'])
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist));
});

/**
 * 发布任务
 */
gulp.task('build', gulp.series(
	'css',
	'js'
));

/**
 * 公共方法
 */

/**
 * sass 编译器
 */
var compass = require('gulp-compass');

/**
 * 编译 sass 文件
 * @param {String} path 需要被编译的 sass 文件的路径
 */
function func_sass(path) {
	var tmp = path.replace(/\\\w*.scss/, '');
	tmp = path.replace(/\/\w*.scss/, '');
	gulp.src(root + path)
		.pipe(compass({
			css: root + tmp,
			sass: root + tmp
		}))
		.on('error', function (err) {
			this.emit('end');
		});
}

/**
 * 注入 css
 * @param {String} path 需要被注入的 css 文件的路径
 */
function inject_css(path) {
	gulp.src(root + path)
		.pipe(browserSync.stream());
}
