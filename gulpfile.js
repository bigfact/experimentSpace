/**
 * gulp 任务文件
 * @author bigfact
 * @date 2016.3.18
 */

/**
 * gulp
 */
var gulp = require('gulp')

/**
 * html 压缩器
 */
var htmlmin = require('gulp-htmlmin')

/**
 * css 压缩器
 */
var cssnano = require('gulp-cssnano')

/**
 * js 压缩器
 */
var uglify = require('gulp-uglify')

/**
 * gulp if
 */
var gulpif = require('gulp-if')

/**
 * gulp useref
 */
var gulpuseref = require('gulp-useref')

/**
 * del
 */
var del = require('del')

/**
 * 文件流操作
 */
var through = require('through2')
var fs = require('fs')

/**
 * 路径处理对象
 */
var path = require('path')

/**
 * sass 编译器
 */
var sass = require('node-sass')

/**
 * 根路径
 */
var root = './'

/**
 * 开发任务
 */

/**
 * 源文件目录
 */
var src = root + 'src/'

/**
 * 编译 sass 文件
 */
gulp.task('sass', function () {
	return gulp.src(src + '**/**.scss')
		.pipe(through.obj(function collectRevs(file, enc, cb) {
			compileSass(path.relative(root, file.path))
			cb()
		}))
})

/**
 * 开发服务器加载
 */
var browserSync = require('browser-sync').create()

/**
 * 开发服务器任务、文件监听
 */
gulp.task('browser', function () {

	// 监听文件自动刷新
	gulp.watch([src + '**/**.js', src + '**/**.html'], browserSync.reload)

	// 监听 css 文件改变，并注入到客户端
	gulp.watch(src + '**/**.css')
		.on('add', function (path) {
			console.log('File ' + path + ' was added')
			injectCss(path)
		})
		.on('change', function (path, stats) {
			console.log('File ' + path + ' was changed')
			injectCss(path)
		})
		.on('unlink', function (path) {
			console.log('File ' + path + ' was removed')
			// injectCss(path)
		})

	// 监听 sass 文件，自动编译
	gulp.watch(src + '**/**.scss')
		.on('add', function (path) {
			console.log('File ' + path + ' was added')
			compileSass(path)
		})
		.on('change', function (path, stats) {
			console.log('File ' + path + ' was changed')
			compileSass(path)
		})
		.on('unlink', function (path) {
			console.log('File ' + path + ' was removed')
		})

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
	})

})

/**
 * 开启开发任务
 */
gulp.task('dev', gulp.series('sass', 'browser'), function (cb) {
	cb()
})

/**
 * 发布任务
 */

/**
 * 发布目录
 */
var dist = root + 'dist/'

/**
 * 清空发布目录
 */
gulp.task('clean', del.bind(null, [dist + '**/*'], { force: true }));

/**
 * 处理 index 文件
 */
gulp.task('index', () => {
	return gulp.src(src + '**/**.html')
		.pipe(gulpuseref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(gulpif('*.html', htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeComments: true,
		})))
		.pipe(gulpif('*.js', gulp.dest(function (file) {
			var tmp = file.path.replace(/\/js\/.*/, '')
			tmp = path.relative(root, tmp).replace(/^src\//, dist)
			return tmp
		})))
		.pipe(gulpif('*.html', gulp.dest(dist)));
});

/**
 * 图片文件处理
 */
gulp.task('img', function () {
	return gulp.src([src + '**/*.png'])
		.pipe(gulp.dest(dist));
});

/**
 * 发布任务
 */
gulp.task('build', gulp.series('sass', 'clean', 'img', 'index'))

/**
 * 方法
 */

/**
 * 编译 sass 文件，默认 css 输出目录为 sass 文件目录
 * @param {String} inputPath 需要被编译的 sass 文件的路径
 */
function compileSass(inputPath) {
	if (/\/_|^_/.test(inputPath)) {
		console.log('This file "' + inputPath + '" won\'t compile.')
		return
	}
	var prefix = inputPath.substr(0, inputPath.length - 4)
	var outputFilePath = {
		css: prefix + 'css',
		map: prefix + 'css.map',
	}
	sass.render({
		file: inputPath,
		outputStyle: 'expanded', // Default: nested Values: nested, expanded, compact, compressed
		// sourceMap: outputFilePath.map
	}, function (error, result) { // node-style callback from v3.0.0 onwards
		if (error) {
			console.log(JSON.stringify(error), '\n')
			// console.log(error.status) // used to be "code" in v2x and below
			// console.log(error.column)
			// console.log(error.message)
			// console.log(error.line)
		} else {
			fs.writeFile(outputFilePath.css, result.css)
			// fs.writeFile(outputFilePath.map, JSON.stringify(result.map))
			// console.log(result.stats)
		}
	})
}

/**
 * 注入 css
 * @param {String} path 需要被注入的 css 文件的路径
 */
function injectCss(path) {
	gulp.src(root + path)
		.pipe(browserSync.stream())
}
