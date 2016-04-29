#Imageoperate
图片操作的组件

## 功能
  * 鼠标滚轮或手势放大、缩小
  * 鼠标点击或手势拖动图片
  * 图片旋转
  
## imageoprate.js 参数及说明
* 仅支持 PC 端

```js
config = {            // 默认配置
  zoomTimes: 1,       // 缩放倍数
  maxWidth: 1980,     // 最大宽度
  minWidth: 320,      // 最小宽度
  degree: 90,         // 每次旋转的度数
  direction: 0        // 旋转方向及次数，正数为顺时针，负数为逆时针
}
```

## imageoprate.gesture.js 参数及说明
* 依赖 gesture.js
* 支持移动端和 PC 端
* 暂不支持旋转

```js
config = {          // 默认配置
  zoomspeed: 10,    // 缩放速度
  maxWidth: 1024,   // 最大宽度
  minWidth: 100     // 最小宽度
}
```

## 例子
* [imageoprate.js 例子](https://bigfact.github.io/frontforge/things/imageoprate/index.html)

```html
<button onclick="clockwise()">顺时针</button>
<button onclick="anticlockwise()">逆时针</button>
<img src="https://avatars1.githubusercontent.com/u/11718965?v=3&s=460" style="position: absolute;">
<script src="src/imageoprate.js"></script>
<script>
    var index = 0;
    var imgs = document.getElementsByTagName('img');
    var imgops = [];
    for(var i = 0; i < imgs.length; i++) {
        imgops[i] = new ImageOprate(imgs[i]);
        imgops[i].init();
    }
    function clockwise () {
        imgops[index].rotate(true);
    }
    function anticlockwise () {
        imgops[index].rotate(false);
    }
</script>
```

* [imageoprate.gesture.js 例子](https://bigfact.github.io/frontforge/things/imageoprate/index.gesture.html)

```html
<img src="https://avatars1.githubusercontent.com/u/11718965?v=3&s=460" style="position: absolute;">
<script src="../gesture/dist/gesture.min.js"></script>
<script src="src/imageoprate.gesture.js"></script>
<script>
    var img = document.getElementsByTagName('img')[0];
    var imgp = new ImageOprate(img);
    img.onload = function() {
      imgp.init();
    }
</script>
```