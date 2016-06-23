/**
 * 弹窗相关插件
 * @version 1.0.0
 * @author bigfact
 * @date 2016.06.16
 */

/**
 * 获取一个弹窗对象
 * @param {Object|{}} options 配置
 * @param {String|''} options.content 弹窗内容（ html 字符串 ）
 * @param {Bool|true} options.clickhide 是否点击隐藏
 * @param {Function|function(){}} options.click 弹窗点击回调函数
 * @return {Node} node 弹窗节点对象，该节点包含显示（ node.show() ）、隐藏（ node.hide() ）、移除（ node.remove() ）方法
 * @example
 * pop({
 *     content: '',
 *     clickhide: true,
 *     click: function(e) {
 *         console.log(e, '弹窗点击事件回调函数');
 *     },
 * });
 */
function pop(options) {
	options = options || {};
	var node = document.createElement('div');
	node.className = 'pop';
	node.style.display = 'none';
	node.innerHTML = '<div class="mask"></div>';
	node.innerHTML += options.content || '';
	node.addEventListener('click', function (e) {
		typeof options.click === 'function' && options.click(e);
		options.clickhide != false && this.remove();
	}, false);
	// 显示
	node.show = function () {
		node.style.display = 'block';
	};
	// 隐藏
	node.hide = function () {
		node.style.display = 'none';
	};
	return node;
}

/**
 * 获取一个 loading 框对象
 * @param {Object|{}} options 配置
 * @param {Bool|true} options.clickhide 是否点击隐藏
 * @param {Node|document.body} options.parent loading 框的父容器
 * @return {Node} node loading 节点对象，该节点包含显示（ node.show() ）、隐藏（ node.hide() ）、移除方法 ( node.remove() )
 * @example
 * loading({
 *     clickhide: true,
 *     parent: document.body,
 * });
 */
function loading(options) {
	options = options || {};
	var node = '<div class="loading"><i></i><i></i><i></i></div>';
	node = pop({
		content: node,
		clickhide: options.clickhide,
	});
	try {
		options.parent.appendChild(node);
	}
	catch (err) {
		document.body.appendChild(node);
	}
	return node;
}

/**
 * 弹出一个对话框
 * @param {Object|{}} options 配置信息
 * @param {String|'提示'} options.title 标题
 * @param {String|''} options.content 内容
 * @param {Bool|true} options.clickhide 是否点击隐藏
 * @param {String|'取消'} options.no 取消按钮文字
 * @param {Function|undefine} options.noclick 取消按钮点击回调函数
 * @param {String|'确定'} options.yes 确定按钮文字
 * @param {Function|undefine} options.yesclick 确定按钮点击回调函数
 * @param {Node|document.body} options.parent 弹窗父节点
 * @return {Node} node 对话框节点对象，该节点包含显示（ node.show() ）、隐藏（ node.hide() ）、移除（ node.remove() ）方法
 * @example
 * dialog({
 *     title: '提示',
 *     content: '',
 *     clickhide: true,
 *     no: '取消',
 *     noclick: function (e) {
 *         console.log(e);
 *     },
 *     yes: '确定',
 *     yesclick: function (e) {
 *         console.log(e);
 *     },
 * 	   parent: document.body,
 * );
 */
function dialog(options) {
	options = options || {};
	var node = '<div class="dialog"><div class="title c-blue">';
	node += options.title || '提示';
	node += '</div><div class="content">';
	node += options.content || '';
	node += '</div><div class="footer">';
	(options.no || options.noclick) && (node += '<div data-type="no">' + (options.no == true ? '取消' : options.no || '取消') + '</div>');
	(options.yes || options.yesclick) && (node += '<div data-type="yes">' + (options.yes == true ? '确定' : options.yes || '确定') + '</div>');
	node += '</div></div>';
	node = pop({
		content: node,
		click: function (e) {
			var type = e.target.getAttribute('data-type');
			type == 'no' && typeof options.noclick === 'function' && options.noclick(e);
			type == 'yes' && typeof options.yesclick === 'function' && options.yesclick(e);
		},
		clickhide: options.clickhide,
	});
	node.show();
	try {
		options.parent.appendChild(node);
	}
	catch (err) {
		document.body.appendChild(node);
	}
	return node;
}
