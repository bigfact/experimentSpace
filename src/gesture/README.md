# Gesture

js 手势判断，移动端和 pc 端均支持

## 类型
* 点击 click
* 滑动 up, down, left, right 
* 缩放 zoom

## [例子](https://bigfact.github.io/frontforge/things/gesture/index.html)
```html
  <p class="info">massage</p>
  <!--<script src="dist/gesture.min.js"></script>-->
  <script src="src/gesture.js"></script>
  <script>
    var info = document.getElementsByClassName('info')[0];
    // 需要进行手势判断的对象
    var obj = new Gesture(document);
    // 初始化
    obj.init({
      // 手势开始时需要执行函数
      start: function () {
        info.textContent = 'x: ' + obj.points.first[0].x + ', y: ' + obj.points.first[0].y + ', t: ' + obj.type + ', s: ' + obj.scale;
      },
      // 手势中需要执行函数
      doing: function () {          
        info.textContent = 'x: ' + obj.points.current[0].x + ', y: ' + obj.points.current[0].y + ', t: ' + obj.type + ', s: ' + obj.scale;            
      },
      // 手势结束时需要执行函数
      finish: function () {
        info.textContent = 'x: ' + obj.points.last[0].x + ', y: ' + obj.points.last[0].y + ', t: ' + obj.type + ', s: ' + obj.scale;
      }
    });
  </script>
```

## 数据
* type: String, ('up', 'down', 'left', 'right', 'zoom', 'click'), 记录每次手势结束后的手势类型
* scale: Number, 1, 记录每次缩放后的比例
* points
    * first: Array, (first[0].x, first[0].y), 记录手势开始时触点的点集
    * current: Array, (current[0].x, current[0].y), 记录手势时当前触点的点集
    * last: Array, (last[0].x, last[0].y), 记录手势结束时触点的点集

