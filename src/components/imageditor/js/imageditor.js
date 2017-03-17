/**
 * 图片裁剪组件
 * @author bigfact <bigfact0@gmail.com>
 * @time 2016.05.01
 */

(function (w) {

  function Imageditor(img) {
    var _this = this;
    _this.img = img;
    _this.block;
    _this.box;
    _this.canvas;
    _this.canvasCtx;
    _this.state = {};
    // 配置
    _this.config = {      // 默认配置
      zoomspeed: 1.03,    // 缩放速度
      maxWidth: 1024,     // 最大宽度
      minWidth: 200       // 最小宽度
    }
  }

  Imageditor.prototype = {
    // 初始化
    init: function () {
      var _this = this;
      // 容器
      _this.block = document.createElement('div');
      _this.block.className = 'imageditor';
      // 画布
      _this.canvas = document.createElement('canvas');
      _this.block.appendChild(_this.canvas);
      // 画布尺寸
      _this.canvas.width = _this.img.clientWidth;
      _this.canvas.height = _this.img.clientHeight;
      // 画布上下文
      _this.canvasCtx = _this.canvas.getContext("2d");
      // 图片
      var tmp = document.createElement('img');
      tmp.src = _this.copy(_this.img);
      _this.img = tmp;
      _this.block.appendChild(_this.img);
      // 参考框
      _this.box = document.createElement('div');
      _this.box.className = 'box';
      _this.block.appendChild(_this.box);
      // 显示
      document.body.appendChild(_this.block);
      // 事件监听
      _this.start = proxy(_this.start, _this);
      _this.zoom = proxy(_this.zoom, _this);
      _this.block.addEventListener('mousedown', _this.start, false);
      _this.block.addEventListener('touchstart', _this.start, false);
      _this.block.addEventListener('mousewheel', _this.zoom, false);
      _this.block.addEventListener('DOMMouseScroll', _this.zoom, false);
    },
    // 操作开始
    start: function (e) {
      var _this = this;
      eventPreventStop(e);
      // 数据记录
      _this.state.first = getPointsPosition(e);
      _this.state.x = _this.img.offsetLeft - _this.state.first[0].x;
      _this.state.y = _this.img.offsetTop - _this.state.first[0].y;
      // 事件监听
      _this.doing = proxy(_this.doing, _this);
      _this.finish = proxy(_this.finish, _this);
      _this.block.addEventListener('mousemove', _this.doing, false);
      _this.block.addEventListener('mouseup', _this.finish, false);
      _this.block.addEventListener('touchmove', _this.doing, false);
      _this.block.addEventListener('touchend', _this.finish, false);
    },
    // 操作中
    doing: function (e) {
      var _this = this;
      eventPreventStop(e);
      _this.state.current = getPointsPosition(e);
      // 移动
      if (_this.state.current.length < 2) {
        _this.img.style.left = _this.state.current[0].x + _this.state.x + 'px';
        _this.img.style.top = _this.state.current[0].y + _this.state.y + 'px';
      }
      // 缩放
      else {
        _this.zoom();
      }
    },
    // 操作结束
    finish: function (e) {
      var _this = this;
      eventPreventStop(e);
      _this.state = {};
      // 事件注销
      _this.block.removeEventListener('mousemove', _this.doing, false);
      _this.block.removeEventListener('mouseup', _this.finish, false);
      _this.block.removeEventListener('touchmove', _this.doing, false);
      _this.block.removeEventListener('touchend', _this.finish, false);
    },
    // 缩放
    zoom: function (e) {
      var _this = this;
      var delta = 0;
      if (e) {
        eventPreventStop(e);
        delta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
      }
      else {
        var d1 = getDistance(_this.state.first);
        var d2 = getDistance(_this.state.current);
        _this.state.first = _this.state.current;
        d2 > d1 && (delta = 1);
        d2 < d1 && (delta = -1);
      }
      var w = _this.img.clientWidth;
      var h = _this.img.clientHeight;
      var s = _this.config.zoomspeed;
      delta > 0 && (w *= s, h *= s);
      delta < 0 && (w /= s, h /= s);
      w >= _this.config.minWidth && w <= _this.config.maxWidth && (_this.img.style.width = w + 'px', _this.img.style.height = h + 'px');
    },
    // 裁剪
    cut: function () {
      var _this = this;
      _this.img.src = _this.copy(_this.img);
      _this.canvas.width = 200;
      _this.canvas.height = 200;
      _this.canvasCtx.drawImage(
        _this.img,
        _this.box.offsetLeft - _this.img.offsetLeft,
        _this.box.offsetTop - _this.img.offsetTop,
        _this.box.clientWidth,
        _this.box.clientHeight,
        0,
        0,
        _this.canvas.width,
        _this.canvas.height
      );
      return _this.canvas.toDataURL();
    },
    // 复制
    copy: function (img) {
      var _this = this;
      _this.canvas.width = img.clientWidth;
      _this.canvas.height = img.clientHeight;
      _this.canvasCtx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        _this.canvas.width,
        _this.canvas.height
      );
      var tmp = _this.canvas.toDataURL();
      _this.canvas.width = 0
      _this.canvas.height = 0;
      return tmp;
    }
  }

  // 改变事件处理方法中 this 指针
  function proxy(fn, context) {
    var args = toArray(arguments, 2);
    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
    };
  }

  function toArray(obj, offset) {
    offset = offset >= 0 ? offset : 0;
    if (Array.from) {
      return Array.from(obj).slice(offset);
    }
    return Array.prototype.slice.call(obj, offset);
  }

  // 根据事件获取当前触点的位置
  function getPointsPosition(e) {
    var points;
    var touches;
    if (e.touches) {
      points = [];
      touches = e.touches.length == 0 ? (e.touches = e.changedTouches) : e.touches;
      for (var i = 0; i < touches.length; i++) {
        points.push({
          x: touches[i].clientX,
          y: touches[i].clientY
        });
      }
    }
    points = points || [{
      x: e.clientX || e.pageX,
      y: e.clientY || e.pageY
    }];
    return points;
  }

  // 计算两点之间的距离
  function getDistance(points) {
    var w = points[0].x - points[1].x;
    var h = points[0].y - points[1].y;
    return Math.sqrt(w * w + h * h);
  }

  // 阻止事件默认行为和事件冒泡或捕获
  function eventPreventStop(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  window.Imageditor = Imageditor;
  return Imageditor;

})(window);
