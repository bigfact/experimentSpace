/**
 * js Number 对象实例方法测试
 * @author bigfact
 */
!function (g) {
  /**
   * dom 选择方法
   * @param {String} selector css 选择器字符串
   */
  function query(selector) {
    return document.querySelector(selector)
  }

  /**
   * 新建一个节点
   * @param {String} type 节点类型
   * @return {Element} 节点
   */
  function createElement (type) {
    return document.createElement(type)
  }

  /**
   * 输出值列表二维数组到页面
   * @param {Array} values 值列表二维数组
   */
  function output(values) {
    var table = createElement('table')
    table.className = 'table'
    for (var i = 0; i < values.length; i++) {
      var row = createElement('tr')
      for (var j = 0; j < values[i].length; j++) {
        var cell = createElement('td')
        cell.innerText = values[i][j]
        row.appendChild(cell)
      }
      table.appendChild(row)
    }
    query('#output-container').appendChild(table)
  }

  /**
   * 生成测试数据
   * @param {Array} values 需要生成测试数据的原始值数组
   * @param {Array} methods 原始值所包含的方法
   * @param {Array} params 方法所需要的参数
   */
  function generateTestData (values, methods, params) {
    var group = []
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < methods.length; j++) {
        for (var k = 0; k < params.length; k++) {
          var tmp = []
          tmp.push(values[i])
          tmp.push('(' + values[i] + ').' + methods[j] + '(' + params[k] + ')')
          try {
            tmp.push((values[i])[methods[j]](params[k]))
          } catch (err) {
            tmp.push(err)
          }
          group.push(tmp)
        }
        group.push(['--', '--', '--'])
      }
    }
    return group
  }

  // 生成值二维数据并输出到页面
  output(
    generateTestData(
      [-1, 0, 1, 1.02, 1.05, 11.1220],
      ['toExponential', 'toFixed', 'toPrecision'],
      [-1, 0, 1, 5]
    )
  )

} (window)
