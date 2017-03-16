/**
 * window.performance.timing 属性测试
 * @author bigfact
 * @date 2017.02.28
 * @reference https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming
 */

(function (_global) {
  var tmp = window.performance.timing
  var frag = document.createElement('ul')
  for (var i in tmp) {
    var p = document.createElement('li')
    p.innerText = i + ': ' + tmp[i]
    frag.appendChild(p)
  }
  document.getElementById('output').appendChild(frag)
})(window)
