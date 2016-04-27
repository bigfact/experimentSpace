(function(w) {

  function Imageditor(img) {
    this.img = img;
    this.container = null;
    this.box = null;
    this.canvas = null;
    this.canvasCtx = null;
    this.state = {
      box: {
        w: 100,
        h: 100,
        x: 0,
        y: 0
      },
      img: {
        w: 0,
        h: 0,
        x: 0,
        y: 0
      },
      spot: []
    };
  }

  Imageditor.prototype = {
    // 初始化
    init: function() {
      var _this = this;

      _this.img.onload = function() {

        _this.container = document.createElement('div');
        _this.container.className = 'container';

        _this.canvas = document.createElement('canvas');
        _this.canvas.width = _this.img.clientWidth;
        _this.canvas.height = _this.img.clientHeight;
        _this.container.appendChild(_this.canvas);

        _this.canvasCtx = _this.canvas.getContext("2d");
        _this.canvasCtx.drawImage(_this.img, 0, 0, _this.img.naturalWidth, _this.img.naturalHeight, 0, 0, _this.img.clientWidth, _this.img.clientHeight);

        var img = document.createElement('img');
        img.src = _this.canvas.toDataURL();
        _this.img = img;
        _this.state.img = {
          w: _this.img.clientWidth,
          h: _this.img.clientHeight,
          x: _this.img.clientX,
          y: _this.img.clientY
        }
        _this.container.appendChild(_this.img);

        _this.box = document.createElement('div');
        _this.box.className = 'box';
        _this.box.style.width = _this.state.box.w + 'px';
        _this.box.style.height = _this.state.box.h + 'px';
        _this.box.style.left = _this.state.box.x + 'px';
        _this.box.style.top = _this.state.box.y + 'px';
        _this.moveStart = proxy(_this.moveStart, _this);
        _this.box.addEventListener('mousedown', _this.moveStart, false);
        _this.box.addEventListener('touchstart', _this.moveStart, false);
        _this.container.appendChild(_this.box);

        document.body.appendChild(_this.container);
      }
    },
    zoom: function() { },
    moveStart: function(e) {
      var _this = this;
      e.preventDefault();
      e.stopPropagation();
      _this.state.spot[0] = getSpotPosition(e);
      _this.moving = proxy(_this.moving, _this);
      _this.moveEnd = proxy(_this.moveEnd, _this);
      document.addEventListener('mousemove', _this.moving, false);
      document.addEventListener('touchmove', _this.moving, false);
      document.addEventListener('mouseup', _this.moveEnd, false);
      document.addEventListener('touchend', _this.moveEnd, false);
    },
    moving: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var _this = this;
      _this.state.spot[1] = getSpotPosition(e);
      var w = _this.state.spot[1].x - _this.state.spot[0].x + _this.state.box.x;
      var h = _this.state.spot[1].y - _this.state.spot[0].y + _this.state.box.y;
      _this.box.style.left = (w > 0 ? w : 0) + 'px';
      _this.box.style.top = (h > 0 ? h : 0) + 'px';
    },
    moveEnd: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var _this = this;
      _this.state.box.x = _this.box.offsetLeft;
      _this.state.box.y = _this.box.offsetTop;
      document.removeEventListener('mousemove', _this.moving, false);
      document.removeEventListener('touchmove', _this.moving, false);
      document.removeEventListener('mouseup', _this.moveEnd, false);
      document.removeEventListener('touchend', _this.moveEnd, false);
      _this.get();
    },
    get: function() {
      var _this = this;
      _this.canvas.width = _this.state.box.w;
      _this.canvas.height = _this.state.box.h;
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
    }
  }

  // 根据事件对象获取接触点的坐标
  function getSpotPosition(e) {
    var touches = {};
    if (e.touches != undefined) {
      if (e.touches.length > 1) {
        touches = [];
        for (var i = 0; i < e.touches.length; i++) {
          touches[i].x = e.touches[i].clientX;
          touches[i].y = e.touches[i].clientY;
        }
        return touches;
      }
      touches.x = e.touches[0].clientX;
      touches.y = e.touches[0].clientY;
    }
    touches.x = (touches.x || e.clientX || e.pageX) + window.scrollX;
    touches.y = (touches.y || e.clientY || e.pageY) + window.scrollY;
    return touches;
  }
  // 改变事件函数this指针
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

  window.Imageditor = Imageditor;
  return Imageditor;

})(window);
