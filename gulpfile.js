/**
 * @version 1.4.1
 * @author bigfact
 * @date 2016.3.18
 */

/**
 * gulp
 */
var gulp = require('gulp');
var through = require('through2');
var path = require('path');

/**
 * 开发服务器加载
 */
var browserSync = require('browser-sync').create();

/**
 * sass 编译器
 */
var compass = require('gulp-compass');

/**
 * 文件状态监听器
 */
var watch = require('gulp-watch');

/**
 * 根路径
 */
var root = './';

/**
 * 子项目路径
 */
var thing = '';
var argv = process.argv;
for (var i = 0; i < argv.length; i++) {
	argv[i].indexOf('--thing') >= 0 && (thing = argv[i].split('=')[1]);
}

// gulp debug --thing=things/fool2016
// gulp build --thing=things/fool2016

/**
 * 开发任务
 */

/**
 * 源文件目录
 */
var src = root + (thing ? thing + '/' : '');

/**
 * 编译 sass 文件
 */
gulp.task('sass', function () {
	return gulp.src(src + 'things/**/**.scss')
		.pipe(through.obj(function collectRevs(file, enc, cb) {
			console.log(path.relative(src, file.path));
			func_sass(path.relative(src, file.path));
			cb();
		}));
});

// gulp.task('sass', function () {
// 	return gulp.src(src + 'sass/**/*.scss')
// 		.pipe(compass({
// 			css: src + 'css',
// 			sass: src + 'sass'
// 		})).on('error', (err) => {
// 			console.log('sass Error!', err.message);
// 		});
// });

/**
 * 编译 sass 文件
 * @param {String} path 需要被编译的 sass 文件的路径
 */
function func_sass(path) {
		var tmp = path.replace(/\\\w*.scss/, '');
		gulp.src(src + path)
		.pipe(compass({
			css: src + tmp,
			sass: src + tmp
		}))
		.on('error', function (err) {
			// console.log('sass Error!', err.message);
			this.emit('end');
		});
}

/**
 * 开发服务器任务、文件监听
 */
gulp.task('browser', function () {

		// 监听文件自动刷新
		watch([src + '**/**.js', src + '**/**.css', src + '**/**.html'], browserSync.reload);

		// gulp.watch(src + 'sass/**/*.scss', gulp.parallel('sass'));

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
			func_sass(path);
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
gulp.task('debug', gulp.series('sass', 'browser'), function (callback) {
		callback();
});

/**
 * 发布任务
 */

/**
 * 发布目录
 */
var dist = root + (thing ? thing + '/' : '');

// /**
//  * 目录清空插件
//  */
// var clean = require('gulp-clean');

/**
 * css 压缩器
 */
var cleancss = require('gulp-clean-css');

/**
 * 文件重命名插件
 */
var rename = require('gulp-rename');

/**
 * js 压缩器
 */
var uglify = require('gulp-uglify');

// /**
//  * 清空 dist 目录
//  */
// gulp.task('clean', function () {
// 	return gulp.src(dist, { read: false })
// 		.pipe(clean());
// });

// /**
//  * 图片文件处理
//  */
// gulp.task('img', function () {
// 	return gulp.src(src + '**/img/**/*.*')
// 		// .pipe(rev())
// 		.pipe(gulp.dest(dist))
// 		// .pipe(rev.manifest())
// 		// .pipe(gulp.dest(revd + imgs))
// 		;
// });

/**
 * js 文件处理
 */
gulp.task('js', function () {
		return gulp.src([src + '**/*.js', '!' + src + '**/*.min.js'])
		// .pipe(gulp.dest(dist))
		// 丑化
		.pipe(uglify())
		// 重命名
		.pipe(rename({ suffix: '.min' }))
		// 计算 hash
		// .pipe(rev())
		// 发布到 dist
		.pipe(gulp.dest(dist))
		// // 生成列表
		// .pipe(rev.manifest())
		// // 列表发布到 rev
		// .pipe(gulp.dest(revd + js))
		;
});

/**
 *  css 文件处理
 */
gulp.task('css', function () {
		return gulp.src([src + '**/*.css', '!' + src + '**/*.min.css'])
		// .pipe(gulp.dest(dist))
		.pipe(cleancss())
		.pipe(rename({ suffix: '.min' }))
		// .pipe(rev())
		.pipe(gulp.dest(dist))
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

// /**
//  * html 文件处理
//  */
// gulp.task('html', function () {
// 	return gulp.src(src + '**/*.html')
// 		.pipe(gulp.dest(dist));
// });

/**
 * 发布任务
 */
gulp.task('build', gulp.series(
		// 'clean',
		// 'html',
		// 'img',
		'sass',
		'css',
		'js'
));