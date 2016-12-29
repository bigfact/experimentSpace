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
