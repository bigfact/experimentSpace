// 
// Author: bigfact<bigfact0gmail.com>
// Time: 2016.03.24
// 

// 
// 基础
// 
var click = 'click';
var touchstart = 'touchstart';

// 
// 主流程
// 
$(document).ready(function() {

    // 
    // 所有弹层关闭
    // 
    $('.popup .close i').on(click, function() {
        $('.popup').hide();
    });

    // 
    // 游戏对象
    // 
    var gameobj = new Game();
    gameobj.timeall = 1;

    // 
    // 页面对象
    // 
    var pageobj = new Page();

    // 
    // 检查访问设备，是否为 APP 访问
    // 
    pageobj.checkApp();

    // 
    // 游戏开始按钮
    // 
    $('.activityTime button').on(click, function(e) {
        // 检查活动时间，如果活动已经过期，则提示
        if (pageobj.checkactivityTime()) {
            $('#activityEnd').show();
            return;
        }
        // 如果为 APP 访问，则需检查登录状态
        if (pageobj.isApp) {
            // todo: 检测登录状态
            pageobj.isLogin && $('#gameontip').show();
            !pageobj.isLogin && $('#login').show();
        }
        // 否则，不检查登录状态
        else {
            $('#gameontip').show();
        }
    });

    // 
    // 活动过期确认按钮点击
    // 
    $('#activityEnd button').on(click, function() {
        $('#activityEnd').hide();
    });

    // 
    // 登录跳转 - APP
    // 
    $('#login button').on(click, function() {
        $('#login').hide();
        pageobj.isLogin = true;
    });

    // 
    // 游戏倒计时开始，倒计时结束后，游戏开始
    //      
    $('#gameontip button').on(click, function() {
        $('.activityTime').hide();
        $('.gameblock').show();
        $('.infoblock').addClass('infoblock2');
        $('#gameontip').hide();
        $('.countdown').show();
        // 游戏倒计时
        clock(4, 1000, function(va) {
            if (va == 0) {
                $('.countdown').hide();
                // 游戏初始化
                gameobj.init(function() {
                    // 游戏结束之后的流程 
                    // 用户未登陆
                    if (pageobj.userdata.phone == null) {
                        $('#msgSend #point').text(gameobj.point);
                        $('#msgSend').show();
                    }
                    // 用户未参加过该活动
                    else if (pageobj.activitydata == null) {
                        $('#gameover #point').text(gameobj.point);
                        $('#gameover #shortof').text(gameobj.fullcoin - gameobj.point);
                        $('#gameover').show();
                    }
                    // 用户已经参加过该活动
                    else {
                        $('#gameplayed').show();
                    }
                });
                // 检查登录状态，获取用户数据
                pageobj.getUserData();
                // 用户已登录，则获取用户参加该活动的数据
                pageobj.userdata != null && pageobj.getActivityData();
            }
            else {
                var tmp = va - 1;
                tmp == 0 && (tmp = 'GO!');
                $('.countdown .time').text(tmp);
            }
        });
    });

    // 
    // 验证码发送
    // 
    $('#msgSend button').on(click, function() {
        pageobj.userdata.phone = $('#msgSend input').val();
        $('#msgSend').hide();
        if (pageobj.checkPhone(pageobj.userdata.phone)) {
            pageobj.sendMsg(function() {
                $('#smsCheck').show();
            });
        }
        else {
            $('#phoneError').show();
        }
    });

    // 
    // 手机号码错误重新填写
    // 
    $('#phoneError button').on(click, function() {
        $('#msgSend').show();
        $('#phoneError').hide();
    });

    // 
    // 验证码检查
    // 
    $('#smsCheck .next').on(click, function() {
        pageobj.userdata.sms = $('#smsCheck input').val();
    });

    // 
    // 验证码重新获取
    // 
    $('#smsCheck .reget').on(click, function() {

    });


});

// 
// 页面对象
// 
function Page() {
    var ths = this;
    // 是否登录标记
    ths.isLogin = false;
    // 是否是 APP 访问标识
    ths.isApp = false;
    // 用户数据
    ths.userdata = {
        phone: null,
        sms: null,
        token: null
    };
    // 活动数据
    ths.activitydata = null;
}
Page.prototype = {
    // 
    // 判断是 app 还是微信进入该活动页面
    // 
    checkApp: function() {
        this.isApp = false;
    },
    // 
    // 获取打开该页面的用户的信息
    // 
    getUserData: function() { },
    // 
    // 获取当前用户参加改活动的信息
    // 
    getActivityData: function() {
        $.ajax({
            url: '/ss',
            type: 'POST',
            data: {
                phone: '18829872887',
                token: 'f42c4v43t54'
            },
            success: function(data) {
                // ths.activitydata = JSON.parse(data);
                console.log('success');
                console.log(data);
            },
            error: function(error) {
                console.log('error');
                console.log(error);
            }
        });
    },
    // 
    // 检查手机号码
    // 
    checkPhone: function(phone) {
        return true;
    },
    // 
    // 发送短信验证码
    // 
    sendMsg: function(callback) {
        callback();
    },
    // 
    // 检查验证码
    // 
    checkSms: function(callback) {
        callback();
        return true;
    },
    // 
    // 提交收集的金币信息
    // 
    postGameData: function() { },
    // 
    // 活动时间检查
    // 
    checkactivityTime: function() {
        return (Date.parse('2016.04.30 23:59:59') < Date.now());
    }
}

// 
// 游戏对象
// 
function Game() {
    var ths = this;
    // 总金币数
    ths.fullcoin = 500;
    // 游戏区域
    ths.gameblock = document.getElementsByClassName('gameblock')[0];
    // 总时间，单位 s
    ths.timeall = 10;
    // 时间显示区域
    ths.tabtime = document.getElementsByClassName('tabtime')[0];
    // 分数显示区域
    ths.tabpoint = document.getElementsByClassName('tabpoint')[0];
    // 当前分数
    ths.point = 0;
    // 当前时间，单位 s
    ths.time = ths.timeall;
    // 金币容器
    ths.coinSet = null;
    // 两次点击之间的合理间隔值，单位 ms，用于限制点击过快，以已知最快点击速度（百度，高桥名人） 16/s 计算，每两次点击之间的间隔应限制为 60 毫秒左右
    ths.mintime = 60;
    // 当前点击时间，单位 ms，用于限制点击过快
    ths.timenow = 0;
}
Game.prototype = {
    // 游戏初始化，传入游戏结束时执行的函数
    init: function(gameover) {
        var ths = this;
        ths.timenow = 0;
        ths.point = 0;
        ths.time = ths.timeall;
        ths.tabtime.innerText = ths.timeall;
        ths.tabpoint.innerText = ths.point;
        ths.coinSet != null && ths.coinSet.parentNode.removeChild(coins);
        ths.coinSet = document.createElement('div');
        ths.gameblock.appendChild(ths.coinSet);
        // 点击监听
        ths.gameblock.addEventListener('click', function(e) {
            ths.onclick(e, ths);
        }, false);
        ths.gameblock.addEventListener('touchstart', function(e) {
            ths.onclick(e, ths);
        }, false);
        // 计时开始
        ths.point == 0 && clock(ths.timeall, 1000, function(va) {
            ths.tabtime.innerText = va;
            ths.time = va;
            // 计时结束，游戏结束
            if (ths.time == 0) {
                (typeof gameover === 'function') && gameover();
            }
        });
    },
    // 点击执行方法
    onclick: function(e, ths) {
        e.preventDefault();
        e.stopPropagation();
        // 已经添加点击间隔时间限制，最小间隔时间为 mintime
        if (ths.time > 0 && Date.now() - ths.timenow > ths.mintime) {
            // if(time > 0) {
            ths.timenow = Date.now();
            ths.point++;
            ths.newcoin(e);
        }
        ths.tabpoint.innerText = ths.point;
    },
    // 生成新的点
    newcoin: function(e) {
        var coin = document.createElement('div');
        coin.className = 'coin';
        coin.style.top = (getSpotPosition(e).y - 50) + 'px';
        coin.style.left = (getSpotPosition(e).x - 50) + 'px';
        this.coinSet.appendChild(coin);
    }
}

// 
// 公共方法
// 
// 计时方法 
function clock(i, j, onchang) {
    (i > 0 && j > 0) && setTimeout(function() {
        i--;
        // (typeof onchang === 'function') && onchang(i);
        onchang(i);
        clock(i, j, onchang);
    }, j);
}
// 根据事件获取当前触点的位置
function getSpotPosition(e) {
    var touches = {};
    if (e.touches != undefined) {
        touches.x = e.touches[0].clientX;
        touches.y = e.touches[0].clientY;
    }
    touches.x = touches.x || e.clientX || e.pageX;
    touches.y = touches.y || e.clientY || e.pageY;
    return touches;
}
