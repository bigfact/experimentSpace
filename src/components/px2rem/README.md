# px2rem

  移动端等比缩放布局

## 原理
  css rem 长度单位，是根据根元素 html 的字体大小值 `font-size` 来计算实际显示尺寸。使用 rem 单位设置某些元素的尺寸和字体大小，通过 js 判断窗口大小，根据一定比例动态设置根元素 html 的字体大小值，从而使页面上所有使用 rem 单位的属性动态改变尺寸。

## 使用

### css
* 推荐使用 `sass` css 预处理语言编写和组织样式代码
```scss
  @import 'path/to/_px2rem';

  html {
    font-size: $html_font_size + px;
  }

  body {
    font-size: px2rem(14);
  }

  .test-box {
    width: px2rem(100);
    height: px2rem(100);
    border: 1px solid #000;
  }
```

* 直接使用原生 css 编写 - 需手动计算 rem 的值，公式 rem_value = px_value / 100 * 1

### js
* 直接引用 js 文件
```html
  <script src="path/to/px2rem.js"></script>
  <script>
    // 设置根元素 html 字体大小
    px2rem();
  </script>
```

* 按模块引用
```js
  import px2rem from 'path/to/px2rem'
  // 设置根元素 html 字体大小
  px2rem()
```

* px2rem 方法参数说明
  * @param {Number|375} base_width 参照屏幕宽度，参照屏幕宽度, 默认参照 iphone 6
  * @param {Number|768} max_width  最大屏幕宽度

## 参考
* [css 长度单位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)
* [sass](http://sass-lang.com/)
* [window.devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)
* [html element meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)