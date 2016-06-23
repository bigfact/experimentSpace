/**
 * input 输入框监听验证方法
 * @version 1.0.0
 * @author bigfact
 * @date 2016.06.20
 */

!function (w) {

	/**
 	 * 当包含 data-watch 属性的输入框输入值改变时对其进行验证，直到其值通过 data-watch 所包含的正则表达式的验证 
 	 * @param {Node} node 需要监听验证的输入框或其父级元素
	 * @example
	 * qsqtools.watch(node);
 	 */
	function watch(node) {
		node instanceof Node && node.addEventListener('input', function (e) {
			var rep = e.target.getAttribute('data-watch');
			while (rep && e.target.value && !(new RegExp(rep).test(e.target.value))) {
				e.target.value = e.target.value.substring(0, e.target.value.length - 1);
			}
		}), false;
	}

	w.qsqtools = w.qsqtools || {};

	w.qsqtools.watch = watch;

} (window);