# webpack上手体验

## 安装
* 全局
> npm install webpack -g

* 需要加载 css 时
> npm install css-loader style-loader --save

* 开发服务器
> npm install webpack-dev-server -g

## 开始
* 项目根目录添加 webpack.config.js 文件
```js
module.exports = {
    entry: './js/entry.js',
    output: {
        path: './js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```
* 普通模式 webpack
* 监视模式 webpack --watch

## 开发服务器
> 运行 webpack-dev-server

> 访问 http://localhost:8080/webpack-dev-server/bundle

## 注意
* 引用文件路径
* webpack-dev-server 自带监视模式，需要访问 http://localhost:8080/webpack-dev-server/bundle ，访问 http://localhost:8080/webpack-dev-server/ 则不行

> This binds a small express server on localhost:8080 which serves your static assets as well as the bundle (compiled automatically). It automatically updates the browser page when a bundle is recompiled (SockJS). Open http://localhost:8080/webpack-dev-server/bundle in your browser.The dev server uses webpack’s watch mode. It also prevents webpack from emitting the resulting files to disk. Instead it keeps and serves the resulting files from memory.

## 参考
* [webpack getting-started](http://webpack.github.io/docs/tutorials/getting-started/)
