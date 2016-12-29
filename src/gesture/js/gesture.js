// *******
// 
// 标题: Gesture.js
// 描述: 手势判断
// 创建者: bigfact
// 创建时间: 2016.01.19
// 
// *******

(function (w) {
  
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

  function Gesture(obj) {
    var _this = this;
    // 手势对象
    _this.obj = obj;
    // 类型
    _this.type = '';
    // 点
    _this.points = {};
    // 缩放比例
    _this.scale = 1;
    // 回调函数对象
    _this.callback = {};
    // 配置
    _this.config = {
      // 手势类型
      type: {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
        zoom: 'zoom',
        click: 'click'
      },
      // 缩放基数
      zoomradix: 1
    };
  }

  Gesture.prototype = {
    // 初始化
    init: function (callback) {
      var _this = this;
      // 事件监听
      _this.start = proxy(_this.start, _this);
      _this.zoom = proxy(_this.zoom, _this);
      _this.obj.addEventListener('mousedown', _this.start, false);
      _this.obj.addEventListener('touchstart', _this.start, false);
      _this.obj.addEventListener('mousewheel', _this.zoom, false);
      _this.obj.addEventListener('DOMMouseScroll', _this.zoom, false);
      // 回调函数初始化
      _this.callback = callback;
    },
    // 手势开始
    start: function (e) {
      var _this = this;
      eventPreventStop(e);
      // 数据记录
      _this.points.first = getPointsPosition(e);
      _this.type = _this.config.type.click;
      // 事件监听
      _this.doing = proxy(_this.doing, _this);
      _this.finish = proxy(_this.finish, _this);
      _this.obj.addEventListener('mousemove', _this.doing, false);
      _this.obj.addEventListener('mouseup', _this.finish, false);
      _this.obj.addEventListener('touchmove', _this.doing, false);
      _this.obj.addEventListener('touchend', _this.finish, false);
      // 回调函数执行
      typeof _this.callback.start == 'function' && _this.callback.start();
    },
    // 手势中
    doing: function (e) {
      var _this = this;
      eventPreventStop(e);
      // 数据记录
      _this.points.current = getPointsPosition(e);
      if (_this.points.current.length < 2) {
        // 计算方向
        var dx = _this.points.current[0].x - _this.points.first[0].x;
        var dy = _this.points.current[0].y - _this.points.first[0].y;
        Math.abs(dx) > Math.abs(dy) && (_this.type = dx > 0 ? _this.config.type.right : _this.config.type.left);  // 水平方向
        Math.abs(dx) < Math.abs(dy) && (_this.type = dy > 0 ? _this.config.type.down : _this.config.type.up);     // 垂直方向
        // 回调函数执行
        typeof _this.callback.doing == 'function' && _this.callback.doing();
      }
      else {
        // 缩放
        _this.zoom();
      }
    },
    // 手势结束
    finish: function (e) {
      var _this = this;
      eventPreventStop(e);
      // 数据记录
      _this.points.last = getPointsPosition(e);
      // 事件注销
      _this.obj.removeEventListener('mousemove', _this.doing, false);
      _this.obj.removeEventListener('mouseup', _this.finish, false);
      _this.obj.removeEventListener('touchmove', _this.doing, false);
      _this.obj.removeEventListener('touchend', _this.finish, false);
      // 回调函数执行
      typeof _this.callback.finish == 'function' && _this.callback.finish();
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
        var d1 = getDistance(_this.points.first);
        var d2 = getDistance(_this.points.current);
        _this.points.first = _this.points.current;
        d2 > d1 && (delta = 1);
        d2 < d1 && (delta = -1);
      }
      delta > 0 && (_this.scale += _this.config.zoomradix);
      delta < 0 && (_this.scale -= _this.config.zoomradix);
      _this.type = _this.config.type.zoom;
      // 回调函数执行
      typeof _this.callback.doing == 'function' && _this.callback.doing();
    }
  }

  w.Gesture = Gesture;

  return Gesture;

})(window);
