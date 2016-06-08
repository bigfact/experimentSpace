/**
 * 单页面应用
 * @version 0.0.2
 * @author bigfact
 * @date 2016.06.06
 */

!function (window) {

  /**
   * 路由
   */
  var routers = {
    '/index': 'tpl/index.html',
    '/test': 'tpl/test.html',
    '/test2': 'tpl/test2.html',
  }

  /**
   * 应用
   */
  var app = {
    default: routers['/index'],
    router: '',
    view: document.querySelector('[bi-view]'),
    v: '0.0.2',
  }

  /**
   * 初始化
   */
  init(window.location.href);
  bi_click(app.view);

  /**
   * 监听 hash 改变 （路由改变）
   */
  window.onhashchange = function (e) {
    init(e.newURL);
  };

  /**
   * 根据当前页面的 url 地址初始化应用
   * @param url 当前页面的地址
   */
  function init(url) {
    app.router = routers[getHash(url)] || app.default;
    // 获取模板
    ajax({
      url: app.router + '?v=' + app.v,
      success: function (response) {
        try {
          eval(response.substring(response.indexOf('<script>') + 8, response.indexOf('</script>')))(app);
          app.view.innerHTML = response;
          // var i = eval(response.substring(response.indexOf('<script>') + 8, response.indexOf('</script>')))(app);
          // console.log(i);
          // typeof app[app.router.ctrl] === 'function' && app[app.router.ctrl]();
        }
        catch (err) {
          console.log(err);
        }
      }
    });
  }

  /**
   * 根据 url 获取 hash 的方法
   * @param url 需要解析的链接地址字符串
   * @returns hash 链接地址字符串中包含的 hash 字符串
   */
  function getHash(url) {
    try {
      return url.split('#')[1];
    }
    catch (err) {
      return null;
    }
  }

  /**
   * 发送一个 ajax 请求
   * @param options 配置信息
   * @example
   * ajax({
   *   type: 'GET',
   *   url: '/data/job.json',
   *   async: true,
   *   noLoading: true,
   *   data: new FormData().append('f', '1'),
   *   progress: function (e) {
   *     console.log(e);
   *   },
   *   success: function (response) {
   *     console.log(response);
   *   },
   *   failed: function (response) {
   *     console.log(response);
   *   },
   *   complete: function (response) {
   *     console.log(response);
   *   }
   * });
   */
  function ajax(options) {

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", updateProgress, false);
    xhr.addEventListener("load", transferSuccess, false);
    xhr.addEventListener("error", transferFailed, false);
    xhr.addEventListener("loadend", transferComplete, false);

    var empty = function () { };
    var progress = typeof options.progress === 'function' ? options.progress : empty;
    var success = typeof options.success === 'function' ? options.success : empty;
    var failed = typeof options.failed === 'function' ? options.failed : empty;
    var complete = typeof options.complete === 'function' ? options.complete : empty;

    xhr.open(options.type || 'GET', options.url, options.async == false ? options.async : true);

    xhr.send(options.data);

    function updateProgress(e) {
      progress(e);
    }

    function transferSuccess(e) {
      if (xhr.status != 200) {
        transferFailed(e);
        return;
      }
      success(parseDataToJSON(xhr.responseText));
    }

    function transferFailed(e) {
      failed(parseDataToJSON(xhr.responseText));
    }

    function transferComplete(e) {
      complete(parseDataToJSON(xhr.responseText));
    }

    function parseDataToJSON(data) {
      var tmp = data;
      try {
        tmp = JSON.parse(tmp);
      }
      catch (err) { }
      return tmp;
    }

  }

  /**
   * 监听元素的点击事件，利用事件委托，执行子元素动作
   * @param node 需要监听 click 事件的元素
   */
  function bi_click(node) {
    node.addEventListener('click', function (e) {
      // 子元素回退动作
      if (e.target.hasAttribute('bi-back')) {
        history.go(-1);
      }
    }, false);
  }

} (window)