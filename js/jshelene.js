$(document).ready(function () {
                        // 分页配置
                        var obj = [
                        <?php 
                          foreach ($data as $k => $val):
                              if(isset($val['0'])) {
                                  if($k != 0) echo ',';
                                  echo '[';
                                  echo '"'.($val['0']  != '' ? $val['0']  : '-').'"'.',';
                                  echo '"'.($val['1']  != '' ? $val['1']  : '-').'"'.',';
                                  echo '"'.($val['2']  != '' ? $val['2']  : '-').'"'.',';
                                  echo '"'.($val['3']  != '' ? $val['3']  : '-').'"'.',';
                                  echo '"'.($val['4']  != '' ? $val['4']  : '-').'"'.',';
                                  echo '"'.($val['5']  != '' ? $val['5']  : '-').'"'.',';
                                  echo '"'.($val['6']  != '' ? $val['6']  : '-').'"'.',';
                                  echo '"'.($val['7']  != '' ? $val['7']  : '-').'"'.',';
                                  echo '"'.($val['8']  != '' ? $val['8']  : '-').'"'.',';
                                  echo '"'.($val['9']  != '' ? $val['9']  : '-').'"'.',';
                                  echo '"'.($val['10']  != '' ? $val['10']  : '-').'"'.',';
                                  echo '"'.($val['11']  != '' ? $val['11']  : '-').'"'.',';
                                  echo '"'.($val['12']  != '' ? $val['12']  : '-').'"'.',';
                                  echo '"'.($val['13']  != '' ? $val['13']  : '-').'"'.',';
                                  echo '"'.($val['14']  != '' ? $val['14']  : '-').'"'.',';
                                  echo '"'.($val['15']  != '' ? $val['15']  : '-').'"'.',';
                                  echo '"'.($val['16']  != '' ? $val['16']  : '-').'"';
                                  echo ']';
                              }
                          endforeach 
                        ?>
                        ];
                        var pagePerNum = 10;
                        var pageIndex = 0;
                        var totalPage = Math.ceil(obj.length / pagePerNum);
                        // 初始化数据分页
                        pageChange();                        
                        // 当前页改变
                        function pageChange() {
                            changeTable();
                            changePagination(totalPage);
                        }
                        // 当前页改变，改变数据表
                        function changeTable() {
                            if($('#table tbody') != undefined) {
                                $('#table tbody').remove();
                            }
                            var tbody = document.createElement('tbody');
                            for(var i = 0; i < pagePerNum; i++) {
                                var tr = document.createElement('tr');
                                for(var j = 0; j < 17; j++) {
                                    var td  = document.createElement('td');
                                    if(obj[i + pageIndex * pagePerNum] != undefined) {
                                        td.innerText = obj[i + pageIndex * pagePerNum][j];
                                    }
                                    else {
                                        break;
                                    }
                                    tr.appendChild(td);
                                }
                                tbody.appendChild(tr);
                            }
                            $(table).append(tbody);
                        }
                        // 当前页改变，改变分页控件
                        function changePagination(num) {
                            $('.pinned .pagination').remove();
                            
                            var ul = document.createElement('ul');
                            ul.className = 'pagination';
                            
                            var first = document.createElement('li');
                            if(pageIndex == 0) {
                                first.setAttribute('class', 'first disabled');
                            }
                            else {
                                first.setAttribute('class', 'first');
                            }
                            first.innerHTML = '<a><span>首页</span></a>';
                            ul.appendChild(first);
                            var prev = document.createElement('li');
                            if(pageIndex == 0) {
                                prev.setAttribute('class', 'prev disabled');
                            }
                            else {
                                prev.setAttribute('class', 'prev');
                            }
                            prev.innerHTML = '<a><span>上一页</span></a>';
                            ul.appendChild(prev);
                            
                            var k = (pageIndex - 4 > 0 ? pageIndex - 4 : 0);
                            k = (k + 9 > totalPage ? totalPage - 9 : k);
                            for(var i = 0; i < 9; i++, k++) {
                                var li = document.createElement('li');
                                if(pageIndex == k) {
                                    li.setAttribute('class', 'active');
                                }
                                var a = document.createElement('a');
                                a.setAttribute('src', 'javascript:;');
                                a.setAttribute('data-page', k);
                                a.innerText = k + 1;
                                li.appendChild(a);
                                ul.appendChild(li);
                            }
                            
                            var next = document.createElement('li');
                            if(pageIndex == totalPage - 1) {
                                next.setAttribute('class', 'next disabled');
                            }
                            else {
                                next.setAttribute('class', 'next');
                            }
                            next.innerHTML = '<a><span>下一页</span></a>';
                            ul.appendChild(next);
                            var last = document.createElement('li');
                            if(pageIndex == totalPage - 1) {
                                last.setAttribute('class', 'last disabled');
                            }
                            else {
                                last.setAttribute('class', 'last');
                            }
                            last.innerHTML = '<a><span>末页</span></a>';
                            ul.appendChild(last);
                            
                            $('.pinned').append(ul);
                            // 分页控件点击事件监听
                            $('.pagination a').each(function () {
                                $(this).click(function() {
                                    pageClick(this);
                                });
                            });
                        }
                        // 控件点击函数
                        function pageClick(obj) {
                            var pageindexold = pageIndex;
                            if($(obj).parent().hasClass('first')) {
                                pageIndex = 0;
                            }
                            else if($(obj).parent().hasClass('prev')) {
                                pageIndex = pageIndex - 1 > 0 ? pageIndex - 1 : 0;
                            }
                            else if($(obj).parent().hasClass('next')) {
                                pageIndex = pageIndex + 1 < totalPage - 1 ? pageIndex + 1 : totalPage - 1;
                            }
                            else if($(obj).parent().hasClass('last')) {
                                pageIndex = totalPage - 1;
                            }
                            else {
                                pageIndex = $(obj).attr('data-page');
                            }
                            if(pageindexold != pageIndex) {
                                pageChange();
                            }
                        }
                        
                    });