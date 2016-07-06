/**
 * 排序算法测试
 * @version 1.0.0
 * @author bigfact
 * @date 2016.07.06
 */

/**
 * 冒泡测试
 */
!function () {
    var input = [1, 4, 3, 5, 6, 2, 6, 7];
    console.log('冒泡排序测试');
    console.log('input：', input);
    Sort.bubble(input, true);
    console.log('output, asc:', input);
    Sort.bubble(input);
    console.log('output, desc:', input);
} ();