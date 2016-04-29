/**
 * 
 * 依赖 ../imageoperate/dist/imageoperate.gesture.min.js
 * 
 */

(function (w) {

  function Imageditor(img) {
    var _this = this;
    _this.img = img;
    _this.block;
    _this.box;
    _this.cover;
    _this.canvas;
    _this.canvasCtx;
  }

  Imageditor.prototype = {
    // 初始化
    init: function () {
      var _this = this;

      _this.block = document.createElement('div');
      _this.block.className = 'imageditor';

      _this.cover = document.createElement('div');
      _this.cover.className = 'cover';
      _this.block.appendChild(_this.cover);

      _this.canvas = document.createElement('canvas');
      _this.canvas.width = _this.img.clientWidth;
      _this.canvas.height = _this.img.clientHeight;
      _this.block.appendChild(_this.canvas);

      _this.canvasCtx = _this.canvas.getContext("2d");

      var tmp = document.createElement('img');
      tmp.src = _this.copy(_this.img);
      _this.img = tmp;
      _this.block.appendChild(_this.img);

      _this.img.onload = function () {
        new ImageOperate(_this.img).init();
      }

      _this.box = document.createElement('div');
      _this.box.className = 'box';
      _this.block.appendChild(_this.box);

      document.body.appendChild(_this.block);
    },
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

  window.Imageditor = Imageditor;
  return Imageditor;

})(window);
