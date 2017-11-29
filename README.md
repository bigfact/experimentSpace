# frontforge

前端熔炉，bigfact 的前端实验室

## 目录

* src: 所有实验小项目
  * public: 公用文件

## 约定

* 每一次 git 提交，只涉及一个小项目内容
* 提交 git 备注格式，小项目名 + 版本 + 更新信息
* 类名大写
* sass 文件和 css 文件放在一个文件夹下

## 环境配置

* 全局

```
$ npm install -g gulp // 版本参照 ./package.json 文件中 gulp 的版本
```

* 项目

```
$ npm install
```

## 开发

* dev

```
$ gulp dev
```

## 发布

```
$ gulp build
```

## 代码相关

* 移动端调试引入 [vconsole](https://github.com/WechatFE/vConsole) (前端调试面板)

```html
<script src="/node_modules/vconsole/dist/vconsole.min.js"></script>
```

## 参考

* [gulp in github](https://github.com/gulpjs/gulp)
* [gulp 官网](http://gulpjs.com/)

## 小项目列表

* fool2016 - fool2016 - 0.1.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/applications/fool2016) - [源码](http://bigfact.github.io/frontforge/src/applications/fool2016/) - [示例](http://bigfact.github.io/frontforge/dist/applications/fool2016/)
* 接金币 - getcoin - 0.2.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/applications/getcoin) - [源码](http://bigfact.github.io/frontforge/src/applications/getcoin/) - [示例](http://bigfact.github.io/frontforge/dist/applications/getcoin/)
* 单页面应用 - singlepageapp - 0.0.2 - [主页](https://github.com/bigfact/frontforge/tree/master/src/applications/singlepageapp) - [源码](http://bigfact.github.io/frontforge/src/applications/singlepageapp/) - [示例](http://bigfact.github.io/frontforge/dist/applications/singlepageapp/)
* snap svg 示例 - snap.svg.demo - 1.0.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/applications/snap.svg.demo) - [源码](http://bigfact.github.io/frontforge/src/applications/snap.svg.demo/) - [示例](http://bigfact.github.io/frontforge/dist/applications/snap.svg.demo/)
* js 手势判断 - gesture - 1.0.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/components/gesture) - [源码](http://bigfact.github.io/frontforge/src/components/gesture/) - [示例](http://bigfact.github.io/frontforge/dist/components/gesture/)
* js 裁剪图片 - imgeditor - 2.0.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/components/imageditor) - [源码](http://bigfact.github.io/frontforge/src/components/imageditor/) - [示例](http://bigfact.github.io/frontforge/dist/components/imageditor/)
* 原生 js 图片预览操作的组件 - imageoperate - 1.2.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/components/imageoperate) - [源码](http://bigfact.github.io/frontforge/src/components/imageoperate/) - [示例](http://bigfact.github.io/frontforge/dist/components/imageoperate/)
* loading - loading - 0.0.1 - [主页](https://github.com/bigfact/frontforge/tree/master/src/components/loading) - [源码](http://bigfact.github.io/frontforge/src/components/loading/) - [示例](http://bigfact.github.io/frontforge/dist/components/loading/)
* 分页组件 - pagination - 1.2.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/components/pagination) - [源码](http://bigfact.github.io/frontforge/src/components/pagination/) - [示例](http://bigfact.github.io/frontforge/dist/components/pagination/)
* 移动端等比缩放布局 - px2rem - 1.0.0 - [主页](https://github.com/bigfact/frontforge/tree/master/src/components/px2rem) - [源码](http://bigfact.github.io/frontforge/src/components/px2rem/) - [示例](http://bigfact.github.io/frontforge/dist/components/px2rem/)
