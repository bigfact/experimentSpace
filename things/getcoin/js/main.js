$(document).ready(function() {
    // 游戏开始检测按钮
    $('.activetime button').click(function() {
        
        // 
        // todo: 检测登录状态
        // 
        
        $('#makesure').show();
        // $('#login').show();
    });
    // 关闭 makesure 弹框
    $('#makesure .close span').click(function() {
        $('#makesure').hide();
    });
    // 游戏开始按钮
    $('#makesure .footer').click(function() {
        
        // 
        // todo: 显示游戏模块，隐藏活动时间模块，活动介绍模块向下移动
        // 
        
        $('#makesure').hide();
        // $('.activetime').hide();
        init();
    });
    // 登录跳转
    $('#login button').click(function() {
        $('#login').hide();
    });
    $('#login button').on('touchstart', function() {
        $('#login').hide();
    });
});





// 总时间，单位 s
var timeall = 10;
// 时间显示区域
var tabtime = document.getElementsByClassName('tabtime')[0];
// 分数显示区域
var tabpoint = document.getElementsByClassName('tabpoint')[0];
// 当前分数
var point = 0;
// 当前时间，单位 s
var time = timeall;
// 点容器
var coins = null;
// 两次点击之间的合理间隔值，单位 ms，用于限制点击过快，以已知最快点击速度（百度，高桥名人） 16/s 计算，每两次点击之间的间隔应限制为 60 毫秒左右
var mintime = 60;
// 当前点击时间，单位 ms，用于限制点击过快
var timenow = 0;
// 重置按钮
var reset = document.getElementsByClassName('reset')[0];
// 初始化
// init();
// 初始化方法
function init() {
    timenow = 0;
    point = 0;
    time = timeall;
    tabtime.innerText = timeall;
    tabpoint.innerText = point;
    reset.setAttribute('disabled', 'disabled');
    coins != null && coins.parentNode.removeChild(coins);
    coins = document.createElement('div');
    document.body.appendChild(coins);
    reset.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        time == 0 && init();
    }, false);
    reset.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        time == 0 && init();
    }, false);
    // 点击监听
    document.addEventListener('click', onclick, false);
    document.addEventListener('touchstart', onclick, false);
}
// 点击执行方法
function onclick(e) {
    e.preventDefault();
    e.stopPropagation();
    // 计时开始
    point == 0 && clock(timeall, 1000, function(va) {
        tabtime.innerText = va;
        time = va;
        time == 0 && reset.removeAttribute('disabled');
    });
    // 已经添加点击间隔时间限制，最小间隔时间为 mintime
    if (time > 0 && Date.now() - timenow > mintime) {
        // if(time > 0) {
        timenow = Date.now();
        point++;
        newcoin(e);
    }
    tabpoint.innerText = point;
}
// 计时方法 
function clock(i, j, onchang) {
    (i > 0 && j > 0) && setTimeout(function() {
        i--;
        // (typeof onchang === 'function') && onchang(i);
        onchang(i);
        clock(i, j, onchang);
    }, j);
}
// 生成新的点
function newcoin(e) {
    var coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.top = (getSpotPosition(e).y - 50) + 'px';
    coin.style.left = (getSpotPosition(e).x - 50) + 'px';
    coins.appendChild(coin);
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