// *******
// 
// 标题: EventUtil.js
// 描述: 事件处理兼容对象
// 创建者: bigfact
// 创建时间: 2016.01.20
// 
// *******

(function (w) {
    'use strict';

    function addEventListener(obj, type, func, uc) {
        if (obj.addEventListener) {
            var uct = uc;
            if (uct == undefined) {
                uct = false;
            }
            obj.addEventListener(type, func, uct);
        }
        else if (obj.attachEvent) {
            obj.attachEvent('on' + type, func);
        }
        else {
            obj['on' + type] = func;
        }
    }

    function removeEventListener(obj, type, func, uc) {
        if (obj.removeEventListener) {
            var uct = uc;
            if (uct == undefined) {
                uct = false;
            }
            obj.removeEventListener(type, func, uct);
        }
        else if (obj.detachEvent) {
            obj.detachEvent('on' + type, func);
        }
        else {
            obj['on' + type] = null;
        }
    }

    function getEvent(e) {
        return e ? e : w.event;
    }

    function getTarget(e) {
        return e.target || e.srcElement;
    }

    function preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            e.returnValue = false;
        }
    }

    function stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            e.cancelBubble = true;
        }
    }

    var EventUtil = {
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,
        getEvent: getEvent,
        getTarget: getTarget,
        preventDefault: preventDefault,
        stopPropagation: stopPropagation
    }

    w.EventUtil = EventUtil;

    return EventUtil;

})(window);