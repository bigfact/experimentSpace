// *******
// 
// 标题: gesture.js
// 描述: 手势判断
// 创建者: bigfact
// 创建时间: 2016.01.19
// 
// *******

(function(w) {

  function proxy(fn, context) {
    var args = toArray(arguments, 2);
    return function() {
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
  function getSpotPosition(e) {
    var touches = {};
    if (e.touches != undefined) {
      touches.x = e.touches[0].clientX;
      touches.y = e.touches[0].clientY;
    }
    touches.x = touches.x || e.clientX || e.pageX;
    touches.y = touches.y || e.clientY || e.pageY;
    return touches;
  }

  function gesture(obj) {
    // 手势对象
    this.obj = obj;
    // 描述数据
    this.direction = '';
    this.beginSpots = [];
    this.currentSpots = [];
    this.endSpots = [];
    // 回调函数对象
    this.callback = {};
  }

  gesture.prototype = {
    // 初始化
    init: function(callback) {
      var ts = this;
      // 事件监听
      ts.begin = proxy(ts.begin, ts);
      ts.obj.addEventListener('mousedown', ts.begin, false);
      ts.obj.addEventListener('touchstart', ts.begin, false);
      // 回调函数初始化
      if (callback != undefined) {
        ts.callback.begin = callback.begin == undefined ? undefined : callback.begin;
        ts.callback.doing = callback.doing == undefined ? undefined : callback.doing;
        ts.callback.end = callback.end == undefined ? undefined : callback.end;
      }
    },
    // 手势开始
    begin: function(e) {
      var ts = this;
      // 阻止事件默认行为
      e.preventDefault();
      // 阻止事件冒泡或捕获
      e.stopPropagation();
      // 数据记录
      var spots = {
        x: getSpotPosition(e).x,
        y: getSpotPosition(e).y
      }
      ts.beginSpots[0] = spots;
      ts.direction = '';
      // 事件监听
      ts.doing = proxy(ts.doing, ts);
      ts.end = proxy(ts.end, ts);
      ts.obj.addEventListener('mousemove', ts.doing, false);
      ts.obj.addEventListener('mouseup', ts.end, false);
      ts.obj.addEventListener('touchmove', ts.doing, false);
      ts.obj.addEventListener('touchend', ts.end, false);
      // 回调函数执行
      if (ts.callback.begin != undefined) {
        ts.callback.begin();
      }
    },
    // 手势中
    doing: function(e) {
      var ts = this;
      // 阻止事件默认行为
      e.preventDefault();
      // 阻止事件冒泡或捕获
      e.stopPropagation();
      // 数据记录
      var spots = {
        x: getSpotPosition(e).x,
        y: getSpotPosition(e).y
      }
      ts.currentSpots[0] = spots;
      // 计算方向
      var dx = spots.x - ts.beginSpots[0].x;
      var dy = spots.y - ts.beginSpots[0].y;
      if (Math.abs(dx) > Math.abs(dy)) {
        // 水平方向
        ts.direction = dx > 0 ? 'right' : 'left';
      }
      else {
        // 垂直方向
        ts.direction = dy > 0 ? 'down' : 'up';
      }
      // 回调函数执行
      if (ts.callback.doing != undefined) {
        ts.callback.doing();
      }
    },
    // 手势结束
    end: function(e) {
      var ts = this;
      // 阻止事件默认行为
      e.preventDefault();
      // 阻止事件冒泡或捕获
      e.stopPropagation();
      // 数据记录
      var spots = {
        x: getSpotPosition(e).x,
        y: getSpotPosition(e).y
      }
      ts.endSpots[0] = spots;
      // 事件注销
      ts.obj.removeEventListener('mousemove', ts.doing, false);
      ts.obj.removeEventListener('mouseup', ts.end, false);
      ts.obj.removeEventListener('touchmove', ts.doing, false);
      ts.obj.removeEventListener('touchend', ts.end, false);
      // 回调函数执行
      if (ts.callback.end != undefined) {
        ts.callback.end();
      }
    }
  }

  w.gesture = gesture;

  return gesture;

})(window);
