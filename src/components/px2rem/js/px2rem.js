/**
 * px2rem.js
 * 配合 ./css/_px2rem.scss 文件，使用 rem 单位布局，使移动端布局达到等比缩放的效果
 * @author bigfact
 * @date 2017.05.03
 */

(function (w) {

  var onload = typeof w.onload == 'function' ? w.onload : function () { }

  var onresize = typeof w.onresize == 'function' ? w.onresize : function () { }

  // defaultPx2remRate 与 ./css/_px2rem.scss 文件中 $html_font_size 的值一致
  var defaultPx2remRate = 100

  /**
   * 设置 html 根元素 font-size 的值
   * @param {Number} base_width 参照屏幕宽度
   * @param {Number} max_width  最大屏幕宽度
   */
  function setHtmlFontSize(base_width, max_width) {
    var scale = 1 / w.devicePixelRatio
    var screenWidth = w.innerWidth
    var font_size = (screenWidth < max_width ? screenWidth / base_width * defaultPx2remRate : max_width / base_width * defaultPx2remRate) / scale
    // // 限制最大为 iphone 6s 屏幕效果
    // var maxFontSize = defaultPx2remRate / scale
    // font_size > maxFontSize && (font_size = maxFontSize)
    // 设置 html 根元素 font-size 的值
    document.documentElement.style.fontSize = font_size + 'px'
  }

  /**
   * 替换 <meta name="viewport"> 标签，适配 DPR(devicePixelRatio) 不等于 1 的设备屏幕
   */
  function replaceMetaViewportTag() {
    var scale = 1 / w.devicePixelRatio
    var metaTag = document.createElement('meta')
    metaTag.name = 'viewport'
    metaTag.content = 'width=device-width, initial-scale=' + scale
      + ', minimum-scale=' + scale
      + ', maximum-scale=' + scale
      + ', user-scalable=no'
    var metaTags = document.querySelectorAll('meta')
    for (var i = 0; i < metaTags.length; i++) {
      // console.log(metaTags[i])
      if (metaTags[i].name == 'viewport') metaTags[i].remove()
    }
    document.head.appendChild(metaTag)
  }

  /**
   * 使用 rem 单位布局，设置根节点字体大小，动态监听窗口大小，等比例缩放根节点字体大小
   * @param {Number|375} base_width 参照屏幕宽度，参照屏幕宽度, 默认参照 iphone 6
   * @param {Number|768} max_width  最大屏幕宽度
   */
  function px2rem(base_width, max_width) {
    base_width = base_width || 375
    max_width = max_width || 768

    // 设置 html 元素字体大小
    setHtmlFontSize(base_width, max_width)
    replaceMetaViewportTag()

    // 文档加载完成执行
    w.onload = function () {
      setHtmlFontSize(base_width, max_width)
      replaceMetaViewportTag()
      onload()
    }

    // 窗口大小改变执行
    w.onresize = function () {
      setHtmlFontSize(base_width, max_width)
      replaceMetaViewportTag()
      onresize()
    }

  }

  // px2rem()

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = px2rem : typeof define === 'function' && define.amd ? define(px2rem) : w.px2rem = px2rem

})(window)
