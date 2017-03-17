/**
 * 分页组件
 * @author bigfact<bigfact0@gmail.com>
 * @date 2016.07.11
 */

(function (window) {

	function Pagination(container) {
		// 容器
		this.container = container;
		// 默认配置
		this.config = {
			totalpage: 0,       // 总页数
			currentpage: 0,     // 当前页
			btnlength: 9        // 页数按钮显示长度
		}
	}
	// 方法定义
	Pagination.prototype = {
		// 初始化
		init: function (options) {
			var ths = this;
			options = options || {};
			ths.config.totalpage = options.totalpage || ths.config.totalpage;
			ths.config.currentpage = options.currentpage || ths.config.currentpage;
			ths.config.btnlength = options.btnlength || ths.config.btnlength;
			ths.config.totalpage <= 0 && (ths.config.totalpage = 1);
			ths.config.currentpage > ths.config.totalpage && (ths.config.currentpage = ths.config.totalpage);
			ths.config.currentpage <= 0 && (ths.config.currentpage = 1);
			ths.config.btnlength > ths.config.totalpage && (ths.config.btnlength = ths.config.totalpage);
			ths.createPage();
		},
		// 生成分页
		createPage: function () {
			var a;
			var ths = this;
			var currentpage = ths.config.currentpage - 1;
			var length = ths.config.btnlength;
			// 分页容器
			var ul = document.createElement('ul');
			ul.className = 'pagination';
			// 第一页
			var first = document.createElement('li');
			first.innerHTML = ('<a data-page="first"><span>首页</span></a>');
			first.className = 'first';
			// 前一页
			var prev = document.createElement('li');
			prev.innerHTML = ('<a data-page="prev"><span>上一页</span></a>');
			prev.className = 'prev';
			if (currentpage == 0) {
				first.className += ' disabled';
				prev.className += ' disabled';
			}
			ul.appendChild(first);
			ul.appendChild(prev);
			// 中间
			var k = currentpage - Math.floor(length / 2);
			k < 0 && (k = 0);
			(k + length > ths.config.totalpage) && (k = ths.config.totalpage - length);
			for (var i = 0; i < length; i++ , k++) {
				var li = document.createElement('li');
				currentpage == k && li.setAttribute('class', 'active');
				li.innerHTML += '<a data-page="' + (k + 1).toString() + '"><span>' + (k + 1).toString() + '</span></a>';
				ul.appendChild(li);
			}
			// 下一页
			var next = document.createElement('li');
			next.innerHTML = ('<a data-page="next"><span>下一页</span></a>');
			next.className = 'next';
			// 末页
			var last = document.createElement('li');
			last.innerHTML = ('<a data-page="last"><span>末页</span></a>');
			last.className = 'last';
			if (currentpage == ths.config.totalpage - 1) {
				next.className += ' disabled';
				last.className += ' disabled';
			}
			ul.appendChild(next);
			ul.appendChild(last);
			// 点击事件监听
			var anodelist = ul.getElementsByTagName('a');
			for (k = 0; k < anodelist.length; k++) {
				anodelist[k].addEventListener('click', function () {
					ths.pageChange(this);
				}, false);
			}
			// 替换最外层容器的控件
			if (ths.container.firstChild != undefined) {
				ths.container.replaceChild(ul, ths.container.firstChild);
			}
			else {
				ths.container.appendChild(ul);
			}
		},
		pageChange: function (obj) {
			var oldPage = this.config.currentpage;
			var datapage = obj.getAttribute('data-page');
			// 判断分页类型
			if (datapage == 'first') {
				this.config.currentpage = 1;
			}
			else if (datapage == 'prev') {
				this.config.currentpage - 1 > 0 && this.config.currentpage--;
			}
			else if (datapage == 'next') {
				this.config.currentpage + 1 <= this.config.totalpage && this.config.currentpage++;
			}
			else if (datapage == 'last') {
				this.config.currentpage = this.config.totalpage;
			}
			else {
				this.config.currentpage = datapage;
			}
			if (oldPage != this.config.currentpage) {
				this.createPage();
				this.callback();
			}
		},
		// 分页状态改变回调函数（对外）
		onChange: function (customFunction) {
			if (typeof customFunction == 'function') {
				this.callback = customFunction;
			}
		}
	}

	window.Pagination = Pagination;

	return Pagination;

})(window);