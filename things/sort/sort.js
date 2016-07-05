/**
 * 排序算法实践
 * @version 1.0.0
 * @author bigfact
 * @date 2016.07.05
 */

!function (w) {

	/**
	 * 排序算法对象
	 */
	var Sort = {
		bubble: bubble,
	};

	/**
 	 * 对输入数组进行冒泡排序
 	 * @param {Array|[]} input 输入数组
 	 * @param {Bool|false} asc 是否升序
 	 */
	function bubble(input, asc) {
		var i = 0, j = 0, n = input.length, f = 1, tmp;
		for (i = 0; i < n && f; i++) {
			f = 0;
			for (j = 0; j < n - i; j++) {
				if ((!asc && input[j] < input[j + 1]) || (asc && input[j] > input[j + 1])) {
					f = 1;
					tmp = input[j];
					input[j] = input[j + 1];
					input[j + 1] = tmp;
				}
			}
		}
	}

	window.Sort = Sort;

} (window);

/**
 * 冒泡测试
 */
!function () {
	var input = [1, 4, 3, 5, 6, 2, 6, 7];
	console.log('冒泡测试');
	console.log('input：', input);
	Sort.bubble(input, true);
	console.log('output, asc:', input);
	Sort.bubble(input);
	console.log('output, desc:', input);
} ();
