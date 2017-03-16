/**
 * 测试
 * @author bigfact
 */
(function () {
  /**
 * 需要处理的数据（日期和数字）
 */
  var arr = [
    {
      d: '2016.11.04',
      v: 12.02
    },
    {
      d: '2016.11.04',
      v: 601.23
    },
    {
      d: '2016.10.17',
      v: 80.50
    },
    {
      d: '2016.10.17',
      v: 494.22
    },
    {
      d: '2016.10.17',
      v: 237.00
    },
    {
      d: '2016.10.24',
      v: 88.00
    },
    {
      d: '2016.10.24',
      v: 79.00
    },
    {
      d: '2016.11.08',
      v: 515.67
    }
  ]

  /**
   * 处理数据方法
   * @param {Array} array 需要处理数据的数组
   */
  function deal(array) {
    var tmp = 0
    var end = new Date('2016.12.08')
    for (var i = 0; i < array.length; i++) {
      tmp += (end - new Date(array[i].d)) / (24 * 60 * 60 * 1000) * array[i].v
    }
    return tmp * 5 / 10000
  }

  console.log(deal(arr))

})()
