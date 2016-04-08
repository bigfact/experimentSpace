# zeemelody
    js手势，现仅支持单点滑动手势判断，移动端和pc端均支持

## [例子](https://bigfact.github.io/frontforge/things/gesture/src/index.html)
```html
    <p class="info">massage</p>
    <script src="js/zeemelody.js"></script>
    <script>
        var info = document.getElementsByClassName('info')[0];
        // 需要进行手势判断的对象
        var obj = new zeemelody(document);
        // 初始化
        obj.init({
            // 手势开始时需要执行函数
            begin: function () {
                info.textContent = 'x: ' + obj.beginSpots[0].x + ', y: ' + obj.beginSpots[0].y + ', d: ' + obj.direction;
            },
            // 手势中需要执行函数
            doing: function () {
                info.textContent = 'x: ' + obj.currentSpots[0].x + ', y: ' + obj.currentSpots[0].y + ', d: ' + obj.direction;
            },
            // 手势结束时需要执行函数
            end: function () {
                info.textContent = 'x: ' + obj.endSpots[0].x + ', y: ' + obj.endSpots[0].y + ', d: ' + obj.direction;
            }
        });
    </script>
```

## 数据
* direction: String, ('up', 'down', 'left', 'right'), 记录每次滑动手势结束后的滑动方向
* beginSpots: Array, (beginSpots[0].x, beginSpots[0].y), 记录滑动手势开始时触点的坐标
* currentSpots: Array, (currentSpots[0].x, currentSpots[0].y), 记录滑动手势时当前触点的坐标
* endSpots: Array, (endSpots[0].x, endSpots[0].y), 记录滑动手势结束时触点的坐标

