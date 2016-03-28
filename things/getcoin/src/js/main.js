// 基础
var touchAndClick = 'touchstart click';
$(document).ready(function() {
    // 
    // 游戏对象
    // 
    var gameobj = new Game();
    // 
    // 游戏开始按钮
    // 
    $('.activityTime button').on(touchAndClick, function(e) {

        // todo: 检测登录状态

        Page.isLogin && $('#gameon').show();
        !Page.isLogin && $('#login').show();
    });
    // 
    // 登录跳转
    // 
    $('#login button').on(touchAndClick, function() {
        $('#login').hide();
        Page.isLogin = true;
    });
    // 
    // 不开始游戏
    // 
    $('#gameon .close i').on(touchAndClick, function() {
        $('#gameon').hide();
    });
    // 
    // 游戏倒计时开始，倒计时结束后，游戏开始
    // 
    $('#gameon .footer').on(touchAndClick, function() {
        // 游戏倒计时
        clock(4, 1000, function(va) {
            if (va == 0) {
                $('.countdown').hide();
                // 游戏初始化
                gameobj.init(function() {

                    // todo: 游戏结束时执行

                });
            }
            else {
                var tmp = va - 1;
                tmp == 0 && (tmp = 'GO!');
                $('.countdown span').text(tmp);
            }
        });

        $('.activityTime').hide();
        $('.gameblock').show();
        $('.infoblock').addClass('infoblock2');
        $('#gameon').hide();
        $('.countdown').show();
    });





});


// 
// 页面对象
// 
function Page() {
    // 是否登录标记
    this.isLogin = false;
    // // 弹层
    // this.popup = {
    //     // 登录提示
    //     login: '',
    //     // 游戏开始
    //     gameon: '',
    //     // 倒计时
    //     countdown: '',
    //     // 游戏结束
    //     gameover: '',
    //     // 短信发送
    //     msgSend: '',
    //     // 手机号错误
    //     phoneError: '',
    //     // 验证码错误
    //     msgError: '',
    //     // 金币领取成功
    //     coinGeted: '',
    //     // 金币达到 500
    //     coinFull: '',
    //     // 活动结束
    //     activityEnd: ''
    // }
}

Page.prototype = {
    // 
    // 登录状态检查
    // 
    checkLogin: function() { },
    // 
    // 发送短信验证码
    // 
    sendMsg: function() { },
    // 
    // 提交收集的金币信息
    // 
    postGameData: function() { },
    // 
    // 活动时间检查
    // 
    checkactivityTime: function() { },
    // 
    // 获取当前用户参加该活动的信息
    // 
    getUserData: function() { }
}

// 
// 游戏对象
// 
function Game() {
    var ths = this;
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

// // 
// // 弹框
// // 
// function Popup() {
//     this.config = {
//         title: '',
//         content: '',
//         centerBtn: '',
//         bottomBtn: ''
//     }
// }

// Popup.prototype = {
//     init: function() {
//         var ths = this;
//         var tmp = document.createElement('div');
//         tmp.classList = 'popup';
//         tmp.innerHTML = '<div class="main">'
//             + '<p class="close"><i></i></p>'
//             + '<p class="title">' + ths.config.title + '</p>'
//             + '<div>' + ths.config.content + '</div>';
//         centerBtn != '' && (tmp.innerHTML += '<button class="centerBtn">' + ths.config.centerBtn + '</button>');
//         bottomBtn != '' && (tmp.innerHTML += '<button class="footerBtn">' + ths.config.bottomBtn + '</button>');
//         tmp.innerHTML += '</div>';
//         tmp.getElementsByClassName('close').addEventListener('click', function() { }, false);
//         tmp.getElementsByClassName('centerBtn').addEventListener('click', function() { }, false);
//         tmp.getElementsByClassName('footer').addEventListener('click', function() { }, false);
//         document.body.appendChild(tmp);
//     }
// }