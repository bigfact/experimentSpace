// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//      author: "bigfact <bigfact0@gmail.com>"
//      date: 2016.03.11
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(function(window) {
    // 参数
    var originPoint = {};       // 鼠标点击开始坐标
    // 构造函数
    function ImageOprate(obj) {
        this.obj = obj;         // 当前预览对象
        this.config = {         // 默认配置
            zoomTimes: 1,       // 缩放倍数
            maxWidth: 1980,     // 最大宽度
            minWidth: 320,      // 最小宽度
            degree: 90,         // 每次旋转的度数
            direction: 0        // 旋转方向及次数，正数为顺时针，负数为逆时针
        }
    }
    // 方法
    ImageOprate.prototype = {
        // 初始化
        init: function(config) {
            var ths = this;
            // 配置
            config = config || {};
            ths.config.zoomTimes = config.zoomTimes || ths.config.zoomTimes;
            ths.config.maxWidth = config.maxWidth || ths.config.maxWidth;
            ths.config.minWidth = config.minWidth || ths.config.minWidth;
            ths.config.degree = config.degree || ths.config.degree;
            ths.config.direction = config.direction || ths.config.direction;
            // 改变事件函数this指针
            ths.moveStart = proxy(ths.moveStart, ths);
            // 移动开始监听事件
            ths.obj.addEventListener('mousedown', ths.moveStart, false);
            // 鼠标滚轮缩放监听
            ths.mouseWheel = proxy(ths.mouseWheel, ths);
            ths.obj.addEventListener('mousewheel', ths.mouseWheel, false);
            ths.obj.addEventListener('DOMMouseScroll', ths.mouseWheel, false);
        },
        // 移动开始
        moveStart: function(e) {
            var ths = this;
            var obj = ths.obj;
            e.preventDefault();
            e.stopPropagation();
            originPoint.x = obj.offsetLeft - getSpotPosition(e).x;
            originPoint.y = obj.offsetTop - getSpotPosition(e).y;
            ths.moving = proxy(ths.moving, ths);
            ths.moveEnd = proxy(ths.moveEnd, ths);
            obj.addEventListener('mousemove', ths.moving, false);
            window.addEventListener('mouseup', ths.moveEnd, false);
        },
        // 移动中
        moving: function(e) {
            var obj = this.obj;
            e.preventDefault();
            e.stopPropagation();
            var mouse = {
                x: getSpotPosition(e).x,
                y: getSpotPosition(e).y
            };
            obj.style.margin = '0';
            obj.style.left = mouse.x + originPoint.x + 'px';
            obj.style.top = mouse.y + originPoint.y + 'px';
        },
        // 移动结束
        moveEnd: function(e) {
            var ths = this;
            var obj = ths.obj;
            e.preventDefault();
            e.stopPropagation();
            obj.removeEventListener('mousemove', ths.moving, false);
            window.removeEventListener('mouseup', ths.moveEnd, false);
        },
        // 鼠标滚轮监听
        mouseWheel: function (e) {
            var ths = this;
            var obj = ths.obj;
            var config = ths.config;
            e.preventDefault();
            e.stopPropagation();
            e.delta = (e.wheelDelta) ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
            if (e.delta > 0) {
                ths.zoom(-1);
            }
            else if (e.delta < 0) {
                ths.zoom(1);
            }
        },
        // 缩放函数
        zoom: function(isZoomIn) {
            var obj = this.obj;
            var config = this.config;
            if (isZoomIn > 0 && ((config.zoomTimes + 0.1) * obj.clientWidth) <= config.maxWidth) {
                config.zoomTimes += 0.1;
            }
            else if(isZoomIn < 0 && ((config.zoomTimes - 0.1) * obj.clientWidth) >= config.minWidth) {
                config.zoomTimes -= 0.1;
            }
            obj.style.transform = "scale(" + config.zoomTimes + ") " + "rotate(" + (config.direction * config.degree) + "deg)";
        },
        // 旋转
        rotate: function(isclockwise) {
            var obj = this.obj;
            var config = this.config;
            if (isclockwise) {
                config.direction++;
            }
            else {
                config.direction--;
            }
            obj.style.transform = "scale(" + config.zoomTimes + ") " + "rotate(" + (config.direction * config.degree) + "deg)";
        }
    }
    // 根据事件对象获取接触点的坐标
    function getSpotPosition(e) {
        var touches = {};
        if (e.touches != undefined) {
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
    window.ImageOprate = ImageOprate;
    return ImageOprate;
})(window);
