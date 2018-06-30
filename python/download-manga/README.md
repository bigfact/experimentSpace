# 使用 python 脚本下载漫画

### 安装

- 下载并安装 [python3](https://www.python.org/ftp/python/)
- 下载并安装 [anaconda](https://www.anaconda.com/download/)
- 环境安装

```
conda env create -f ./python/environment.yaml
```

### 使用脚本下载

- 切换虚拟环境

```
conda activate onepiece
```

- 如果要下载 800 话到 805 话，则执行脚本

```
python3 main.py 800 6
```

- 下载漫画在 ./downloads 目录下

### conda 常用命令

更新所有依赖包

```
conda upgrade --all
```

创建一个虚拟环境

```
conda create -n env_name list of packages
```

激活某个环境

```
source activate env_name
```

退出某个环境

```
source deactivate
```

列出所有环境

```
conda env list
```

删除某个环境

```
conda env remove -n env_name
```

导出环境配置信息

```
conda env export > environment.yaml
```
