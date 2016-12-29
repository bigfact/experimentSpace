# TinyThings - pagination
web分页组件
    
## 参数
* `config` : 配置信息
    * `totalpage`   : 0，Number，总页数
    * `currentpage` : 0，Number，当前页
    * `btnlength`   : 9，Number，页数按钮显示长度

## 例子 - [example](index.html)
```html
    <div id="container"></div>
    <script src="src/pagination.js"></script>
    <script>
        // 分页控件
        var ex = new Pagination(document.getElementById('container'));
        
        // 初始化分页控件
        ex.init({
            totalpage: 10,      // 设置总页数
            currentpage: 6,     // 设置当前页
            btnlength: 8        // 页数按钮显示长度
        });
        
        // 当分页控件状态改变时执行的方法
        ex.onChange(function () {
            console.log(ex.config);
        });
    </script>
```

## 样式：分页控件的样式使用bootstrap的分页样式
```html
    <link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
```
