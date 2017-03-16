# imgeditor
图片裁剪组件，返回 base64 编码的图片数据

## [例子](https://bigfact.github.io/frontforge/things/imageditor/index.html)
```html
<button id="cut">剪切</button>
<img id="himg" src="../../imgs/11718965.png" style="display: block; width: 100%; position: absolute;">
<!--<script src="/bower/vConsole/dist/vconsole.min.js"></script>-->
<script src="src/imageditor.js"></script>
<script>
  var img = document.getElementById('himg');
  var imgp;
  img.onload = function() {
    imgp = new Imageditor(img);
    imgp.init();
  }
  var cut = document.getElementById('cut');
  cut.addEventListener('click', function() {
    var imgdatabase64 = imgp.cut();
    console.log(imgdatabase64);
  }, false);
</script>
```

```css
.imageditor {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
}

.imageditor img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.imageditor canvas {
  position: absolute;
  top: 0;
  z-index: 1;
  border: 1px solid #f00;
}

.imageditor .box {
  position: absolute;
  width: 200px;
  height: 200px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.7);
  border: 1px solid #666;
}
```