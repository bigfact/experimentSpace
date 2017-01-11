/**
 * 滑动组件
 * @author bigfact
 */
(function (w) {

  /**
   * 控制数据
   */
  var control = {
    moveLength: 0,
    touch: {
      start: {},
      move: {}
    },
    translate: [],
    translateEnd: [],
    slider: {},
    switch: false,
    tid: 0
  }

  /**
   * 默认配置数据
   */
  var defaultConfig = {
    width: 0,
    height: 0,
    itemnum: 0,
    index: 0,
    derection: 'x',
    transitionDuration: 300,
    slideDifficulty: 0.1
  }

  /**
   * 实际配置
   */
  var config = {
    width: document.body.offsetWidth,
    height: 100,
    itemnum: 4,
    index: 0,
    derection: 'x',
    transitionDuration: 500,
    slideDifficulty: 0.1
  }

  // 获取元素
  control.slider = document.querySelector('.slider')

  // 初始化
  init(control.slider)

  /**
   * 初始化
   * @param {Element} slider 组件容器元素
   */
  function init(slider) {
    // 检查配置并设置默认值
    for (var i in defaultConfig) {
      typeof config[i] === 'undefined' && (config[i] = defaultConfig[i])
    }
    // 组件事件监听
    slider.addEventListener('touchstart', slideStart, false)
    slider.addEventListener('touchmove', slideMove, false)
    slider.addEventListener('touchend', slideEnd, false)
    // 计算转换数组数据
    control.translate = generateTranslate(config.width, config.itemnum, config.index)
    // 子元素转换时间设置为0
    setTransitionDuration(slider.children, 0)
    // 转换子元素
    translateElements(slider.children, config.derection, control.translate)
    // 子元素转换时间设置为配置值
    var tid = setTimeout(function () {
      setTransitionDuration(slider.children, config.transitionDuration)
      clearTimeout(tid)
    }, 0)
    // 自动轮播
    setAutoPlay(slider)
  }

  /**
   * 设置自动轮播
   * @param {Element} slider 组件元素
   */
  function setAutoPlay(slider) {
    // 设置自动轮播
    config.tid = setInterval(() => {
      if (++config.index > config.itemnum - 1) {
        // config.index = 0
        switchElement(slider, 1)
        var arr = []
        for (var i = 0; i < config.itemnum - 1; i++) {
          arr.push(-(config.itemnum - 2 - i) * config.width)
        }
        arr.push(config.width)
        // 转换子元素
        translateElements(slider.children, config.derection, arr)
        control.translate = control.translateEnd
        var tid = setTimeout(function () {
          // 转换子元素
          translateElements(slider.children, config.derection, control.translate)
          clearTimeout(tid)
        }, 0)
      } else {
        // 计算转换数组数据
        control.translateEnd = control.translate = generateTranslate(config.width, config.itemnum, config.index)
        // 转换子元素
        translateElements(slider.children, config.derection, control.translate)
      }
    }, 2000)
  }

  /**
   * 停止自动轮播
   */
  function stopAutoPlay() {
    clearInterval(config.tid)
  }

  /**
   * 滑动开始
   * @param {Object} e 触摸事件数据
   */
  function slideStart(e) {
    control.touch.start = e.touches[0]
    control.translateEnd = control.translate
    config.index = getCurrentElementIndex(control.translate)
    control.switch = config.index == 0 || config.index == config.itemnum - 1
    // 停止自动轮播
    stopAutoPlay()
  }

  /**
   * 滑动中
   * @param {Object} e 触摸事件数据
   */
  function slideMove(e) {
    e.preventDefault()
    control.moveLength = control.touch.start.clientX - e.touches[0].clientX
    if (Math.abs(control.moveLength) < 10) return
    var arr = []
    var left = config.index == 0 && control.moveLength < 0
    var right = config.index == config.itemnum - 1 && control.moveLength > 0
    if (left || right) {
      if (left) {
        arr.push(-control.moveLength - config.width)
        for (var i = 1; i < config.itemnum; i++) {
          arr.push(control.translateEnd[i - 1] - control.moveLength)
        }
      } else {
        for (var i = 0; i < config.itemnum - 1; i++) {
          arr.push(control.translateEnd[i + 1] - control.moveLength)
        }
        arr.push(-control.moveLength + config.width)
      }
      if (control.switch) {
        var _this = this
        control.switch = !control.switch
        switchElement(_this, control.moveLength)
        var tid = setTimeout(function () {
          translateElements(_this.children, config.derection, arr)
          clearTimeout(tid)
        }, 0)
        return true
      }
    } else {
      for (var i = 0; i < config.itemnum; i++) {
        arr.push(control.translateEnd[i] - control.moveLength)
      }
    }
    translateElements(this.children, config.derection, arr)
    control.translate = arr
  }

  /**
   * 滑动结束
   * @param {Object} e 触摸事件数据
   */
  function slideEnd(e) {
    if (Math.abs(control.moveLength / config.width) > config.slideDifficulty) {
      control.translate = generateTranslate(config.width, config.itemnum, control.moveLength < 0 ? config.index - 1 : config.index + 1)
    } else {
      control.translate = control.translateEnd
    }
    translateElements(this.children, config.derection, control.translate)
    // 自动轮播
    setAutoPlay(this)
  }

  /**
   * 根据尺寸、子元素数、当前子元素序号生成子元素转换数组
   * @param {Number} size 尺寸，滑动方向为垂直时，数值为高度，滑动方向为水平时，数值为宽度
   * @param {Number} itemnum 子元素数
   * @param {Number} index 当前子元素序号
   * @return {Array} translate 子元素转换数组
   */
  function generateTranslate(size, itemnum, index) {
    index = typeof index === 'undefined' ? 0 : index
    index < 0 && (index = 0)
    index > itemnum - 1 && (index = itemnum - 1)
    var translate = []
    var i = 0
    for (i = 0; i < index; i++) {
      translate.push(-(index - i) * size)
    }
    translate.push(0)
    for (i = index + 1; i < itemnum; i++) {
      translate.push((i - index) * size)
    }
    return translate
  }

  /**
   * 转换元素
   * @param {Element} elements 元素数组
   * @param {derection} derection 转换方向
   * @param {Array} translateArray 转换数据数组
   */
  function translateElements(elements, derection, translateArray) {
    var translate3dSstart = 'translate3d('
    var translate3dEnd = ''
    if (derection === 'y') {
      translate3dSstart += '0px, '
      translate3dEnd = ', 0px)'
    } else {
      translate3dEnd += ', 0px, 0px)'
    }
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.transform = translate3dSstart + translateArray[i] + 'px' + translate3dEnd
    }
  }

  /**
   * 设置元素转换时间
   * @param {Element} elements 元素数组
   * @param {Number} transitionDuration 转换持续时间
   */
  function setTransitionDuration(elements, transitionDuration) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.transitionDuration = transitionDuration + 'ms'
    }
  }

  /**
   * 根据转换数组，获取当前显示的子元素序号
   * @param {Array} translateArray 转换数组
   * @return {Number} index 当前显示子元素序号
   */
  function getCurrentElementIndex(translateArray) {
    for (var i = 0; i < translateArray.length; i++) {
      if (translateArray[i] === 0) {
        return i
      }
    }
    return 0
  }

  /**
   * 调整元素子元素的顺序
   * @param {Element} parent 父元素
   * @param {Number} order 调整顺序，正数移动第一个元素到末尾，负数移动最后一个元素到第一个
   */
  function switchElement(parent, order) {
    var tmp = order > 0 ? parent.children[0] : parent.children[parent.children.length - 1]
    tmp.remove()
    tmp.style.transform = 'translate3d(-375px, 0px, 0px)'
    order > 0 ? parent.appendChild(tmp) : parent.insertBefore(tmp, parent.children[0])
  }

})(window)
