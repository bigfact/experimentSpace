/**
 * snap.svg.demo js 文件
 * @author bigfact
 * @date 2017.03.23
 */

(function (w) {

  // 创建容器，高宽为 300px
  var svg = Snap('#svg');

  // 大圆，圆心坐标 x y ，半径 r
  var bigCircle = svg.circle(150, 150, 100);

  // 设置大圆的属性
  bigCircle.attr({
    fill: '#bada55',
    stroke: '#000',
    strokeWidth: 2
  });

  // 小圆
  var smallCircle0 = svg.circle(80, 150, 70);
  var smallCircle1 = svg.circle(220, 150, 70);

  // 组合小圆
  var smallCircleGroup = svg.group(smallCircle0, smallCircle1);

  // 设置组合中小圆的属性
  smallCircleGroup.attr({
    fill: '#fff'
  });

  // 使大圆只显示组合小圆遮盖的部分
  bigCircle.attr({
    mask: smallCircleGroup
  });

  // 小圆 0 设置半径缩小动画，动画时间为 1000ms
  smallCircle0.animate({
    r: 50
  }, 1000);

  // 使用组合选择器选择小圆 1 设置半径缩小动画，动画时间为 1000ms
  // smallCircleGroup.select('circle:nth-child(2)')
  smallCircleGroup.select('circle:last-of-type')
    .animate({
      r: 50
    }, 1000);

  // 创建路径
  var path = svg.path('M10-5-10,15M15,0,0,15M0-5-20,15').attr({
    fill: 'none',
    stroke: '#bada55',
    strokeWidth: 5
  });

  // 创建图案
  var pattern = path.pattern(0, 0, 10, 10);

  // 使用创建的图案填充大圆
  bigCircle.attr({
    fill: pattern
  });

  // 径向渐变填充两个小圆，渐变效果为单独拥有
  smallCircleGroup.attr({
    fill: 'r()#fff-#000'
  });

  // 径向渐变填充两个小圆，渐变效果为共享， R 函数参数为圆心坐标 x y 半径 r
  smallCircleGroup.attr({
    fill: 'R(150,150,100)#fff-#000'
  });

  // 设置图案填充颜色过渡动画，动画时间为 1000ms
  pattern.select('path')
    .animate({
      stroke: '#f00'
    }, 2000);

  // 加载外部 svg 文件
  Snap.load('http://snapsvg.io/assets/demos/tutorial/mascot.svg', function (file) {
    // 选择单个元素 polygon[fill="#09B39C"] 改变其填充色
    file.select('polygon[fill="#09B39C"]')
      .attr({
        fill: '#bada55'
      });
    // // 选择全部元素 polygon[fill="#09B39C"] 改变其填充色
    // file.selectAll('polygon[fill="#09B39C"]')
    //   .attr({
    //     fill: '#bada55'
    //   });
    // 选择元素 g
    g = file.select('g');
    // 将元素 g 添加到页面上的 svg 中
    svg.append(g);
    // 设置元素 g 可拖动
    g.drag();
  });

  // 添加文字
  svg.text(90, 22, 'snap.svg.demo');

  // 添加文字，并设置文字属性
  var text = svg.text(90, 44, ['snap', '.', 'svg', '.', 'demo']);
  text.select('tspan:last-of-type')
    .attr({
      fill: '#e00',
      fontSize: '20px'
    })

})(window);
