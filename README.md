# frontforge

前端熔炉，bigfact 的前端实验室

## 目录

* things: 所有实验小项目
* css: 公用的 css 文件
* js: 公用的 js 文件
* imgs: 公用的图片文件

## 约定

* 每一次 git 提交，只涉及一个 thing
* 提交 git 备注格式，thing 名 + 版本 + 更新信息
* 类名大写

## 环境配置

* 全局环境

```
$ npm install gulp // 版本参照 /package.json
$ gem install compass
```

* 本地环境

```
$ npm install
$ bower install
```

## 开发

* debug

```
$ gulp
$ // 或者 npm run debug
```

* 移动端调试引入 [vconsole](https://github.com/WechatFE/vConsole) (前端调试面板)

```html
<script src="/node_modules/vconsole/dist/vconsole.min.js"></script>
```

## 参考

* [gulp in github](https://github.com/gulpjs/gulp)
* [gulp 官网](http://gulpjs.com/)
* [compass in github](https://github.com/Compass/compass)
* [compass 官网](http://compass-style.org/)
