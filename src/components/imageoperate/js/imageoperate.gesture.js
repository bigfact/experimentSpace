/**
 * @author bigfact<bigfact0@gmail.com>
 * @date 2016.04.29
 * @dependency ../gesture/dist/gesture.min.js
 */

(function (window) {
    // 构造函数
    function ImageOperate(obj) {
        var _this = this;
        _this.obj = obj;         // 当前预览对象
        _this.gesture = new Gesture(_this.obj);
        _this.scale = 1;
        _this.first = {};
        _this.size = {};
        _this.config = {         // 默认配置
            zoomspeed: 10,       // 缩放速度
            maxWidth: 1024,     // 最大宽度
            minWidth: 100      // 最小宽度
        }
    }
    // 方法
    ImageOperate.prototype = {
        // 初始化
        init: function (config) {
            var _this = this;

            _this.size = {
                w: _this.obj.clientWidth,
                h: _this.obj.clientHeight
            }

            // 配置
            config = config || {};
            _this.config.zoomspeed = config.zoomspeed || _this.config.zoomspeed;
            _this.config.maxWidth = config.maxWidth || _this.config.maxWidth;
            _this.config.minWidth = config.minWidth || _this.config.minWidth;

            _this.gesture.init({
                start: function () {
                    _this.start(_this);
                },
                doing: function () {
                    _this.doing(_this);
                },
                finish: function () {
                    _this.finish(_this);
                }
            });

        },
        start: function (_this) {
            _this.first = {
                x: _this.obj.offsetLeft - _this.gesture.points.first[0].x,
                y: _this.obj.offsetTop - _this.gesture.points.first[0].y
            }
        },
        doing: function (_this) {
            var type = _this.gesture.config.type;
            var type2 = _this.gesture.type;
            if (type2 == type.zoom) {
                _this.zoom(_this);
            }
            else if (type2 == type.up || type2 == type.down || type2 == type.left || type2 == type.right) {
                _this.obj.style.left = _this.gesture.points.current[0].x + _this.first.x + 'px';
                _this.obj.style.top = _this.gesture.points.current[0].y + _this.first.y + 'px';
            }
        },
        finish: function (_this) {
            _this.first = {};
        },
        zoom: function (_this) {
            _this.scale = 1 + _this.gesture.scale * _this.config.zoomspeed / 1000;
            var w = _this.size.w * _this.scale;
            if (w >= _this.config.minWidth && w <= _this.config.maxWidth) {
                _this.obj.style.width = w + 'px';
                _this.obj.style.height = (_this.size.h * _this.scale) + 'px';
            }
        },
    }
    window.ImageOperate = ImageOperate;
    return ImageOperate;
})(window);
