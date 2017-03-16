# ImageOperate

原生 js 图片预览操作的组件

## 功能
  * 鼠标滚轮或手势放大、缩小
  * 鼠标点击或手势拖动图片
  * 图片旋转
	* 仅支持 PC 端
  
## imageoperate.js 参数及说明

```js
config = {            // 默认配置
  zoomTimes: 1,       // 缩放倍数
  maxWidth: 1980,     // 最大宽度
  minWidth: 320,      // 最小宽度
  degree: 90,         // 每次旋转的度数
  direction: 0        // 旋转方向及次数，正数为顺时针，负数为逆时针
}
```

## imageoperate.gesture.js 参数及说明

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

* [imageoperate.js 例子](https://bigfact.github.io/frontforge/src/components/imageoperate/index.html)

```html
<style>
	.img0 {
		position: absolute;
	}
</style>
<button onclick="clockwise()">顺时针</button>
<button onclick="anticlockwise()">逆时针</button>
<img class="img0" src="../../public/img/11718965.png">
<script src="./src/imageoperate.js"></script>
<script>
	var index = 0;
	var imgs = document.getElementsByTagName('img');
	var imgops = [];
	for (var i = 0; i < imgs.length; i++) {
		imgops[i] = new ImageOperate(imgs[i]);
		imgops[i].init();
	}
	function clockwise() {
		imgops[index].rotate(true);
	}
	function anticlockwise() {
		imgops[index].rotate(false);
	}
</script>
```

* [imageoperate.js 例子](https://bigfact.github.io/frontforge/src/components/imageoperate/index.html)

```html
<style>
	.img0 {
		position: absolute;
	}
</style>
<img class="img0" src="../../public/img/11718965.png" style="position: absolute;">
<script src="../gesture/js/gesture.js"></script>
<script src="./js/imageoperate.gesture.js"></script>
<script>
	g = document.getElementsByTagName('img')[0];
	var imgp = new ImageOperate(img);
	img.onload = function () {
		imgp.init();
	}
</script>
```