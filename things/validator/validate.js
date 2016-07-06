/**
 * 表单验证方法
 * @version 1.0.0
 * @author bigfact
 * @date 2016.06.20
 */

!function (w) {

	/**
 	 * 在 trigger 被点击时，对 node 元素或其子元素进行验证，需要被验证的元素需要包含 data-reg 属性，且值为一个可用的正则表达式
 	 * @param {Object} options 配置信息
	 * @param {Node} options.node 需要验证的输入框或其父级元素
	 * @param {Node} options.trigger 触发验证的元素
	 * @param {function} options.cb 验证完成回调函数，包含三个参数 (valid, inputs, i) - (是否验证通过, 输入框数组, 验证失败的输入框位置)
 	 * @example
 	 * Validator.validate({
 	 *     node: node,
 	 *     trigger: button,
 	 *     cb: function (valid, inputs, i) {
 	 *         console.log(valid, inputs, i);
 	 *     }
 	 * });
 	 */
	function validate(options) {
		if (options && options.node instanceof Node && options.trigger instanceof Node) {
			typeof options.cb != 'function' && (options.cb = function () { });
			var inputs = options.node;
			inputs.nodeName.toLocaleLowerCase() != 'input' ? (inputs = inputs.querySelectorAll('input')) : (inputs = new Array(inputs));
			options.trigger.addEventListener('click', function (e) {
				e.preventDefault();
				for (var i = 0; i < inputs.length; i++) {
					var valid = inputs[i].getAttribute('data-valid');
					if (valid && !(new RegExp(valid).test(inputs[i].value))) {
						options.cb(false, inputs, i);
						return;
					}
				};
				options.cb(true, inputs);
			}, false);
		}
	}

	w.Validator = w.Validator || {};

	w.Validator.validate = validate;

} (window);
