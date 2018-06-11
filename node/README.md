# frontforge-node

## node 版本管理

### 安装 nvm

```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

### 安装 node v8.9.x 以上长期支持版本

```
$ nvm install v8.9.4
```

### 设置默认 node 版本为 v8.9.4 （安装完成会默认设置）

```
$ nvm alias default v8.9.4
```

### 查看 node 和 npm 版本

```
$ nvm ls
$ node -v
$ npm -v
```

## 项目运行环境安装

### 进程管理工具

```
$ sudo npm install -g pm2
```

### 项目依赖包安装

```
$ git clone git@github.com:bigfact/frontforge.git --depth=1
$ cd frontforge
$ npm install
```

## 配置

可拷贝默认配置文件，修改相关参数

```
$ # pm2 配置
$ cp ecosystem.config.default.js ecosystem.config.local.js
```

`注意，若已经通过 pm2 启动过应用，再想修改 pm2 配置，必须在修改完之后删掉原来的 pm2 应用进程，重新启动应用，才能使 pm2 配置生效`

```
$ # 修改 pm2 配置
$
$ # 查看应用状态获取 id，并删除应用记录
$ pm2 status
$ pm2 delete {id}
$
$ # 启动应用
```

## 应用启动

```
$ # 生产环境
$ npm run start.node
$
$ # 开发环境
$ npm run start.node.dev
```

`应用代码更新，重启应用，将上面命令中的 start 替换为 reload 执行。开发环境可配置 pm2 监听源文件改变自动重启。`

### 运行状态查看

```
$ pm2 status
```

### 日志查看

```
$ # 查看运行状态获取 pm2 应用记录 id
$ pm2 status
$
$ # 输出日志
$ tail -f logs/out_file_dev-{id}.log
$
$ # 错误日志
$ tail -f logs/error_file_dev-{id}.log
```

### 访问

- 开发环境访问 [http://localhost:1125](http://localhost:1125)
- 生产环境配置 nginx ，配置文件见 [node.conf](./node.conf)

## 参考

- [socket.io](https://github.com/socketio/socket.io/)
- [socket.io examples chat](https://github.com/socketio/socket.io/tree/master/examples/chat)
- [pm2](http://pm2.keymetrics.io/)
