/**
 * @version 0.2.0
 * @author bigfact
 * @date 2016.03.24
 */

// 
// 基础
// 
var click = 'click';
var touchstart = 'touchstart';

// 
// 主流程
// 
$(document).ready(function () {

	// 
	// 所有弹层关闭
	// 
	$('.popup .close i').on(click, function () {
		$('.popup').hide();
	});

	// 
	// 游戏对象
	// 
	var gameobj = new Game();
	gameobj.timeall = 1;

	// 
	// 游戏开始按钮
	// 
	$('.activityTime button').on(click, function (e) {
		$('#gameontip').show();
	});

	// 
	// 游戏倒计时开始，倒计时结束后，游戏开始
	//      
	$('#gameontip button').on(click, function () {
		$('.activityTime').hide();
		$('.gameblock').show();
		$('.infoblock').addClass('infoblock2');
		$('#gameontip').hide();
		$('.countdown').show();
		// 游戏倒计时
		clock(4, 1000, function (va) {
			if (va == 0) {
				$('.countdown').hide();
				// 游戏初始化
				gameobj.init(function () {
					$('#gameover #point').text(gameobj.point);
					$('#gameover #shortof').text(gameobj.fullcoin - gameobj.point);
					$('#gameover').show();
				});
			}
			else {
				var tmp = va - 1;
				tmp == 0 && (tmp = 'GO!');
				$('.countdown .time').text(tmp);
			}
		});
	});

});

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
	init: function (gameover) {
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
		ths.gameblock.addEventListener('click', function (e) {
			ths.onclick(e, ths);
		}, false);
		ths.gameblock.addEventListener('touchstart', function (e) {
			ths.onclick(e, ths);
		}, false);
		// 计时开始
		ths.point == 0 && clock(ths.timeall, 1000, function (va) {
			ths.tabtime.innerText = va;
			ths.time = va;
			// 计时结束，游戏结束
			if (ths.time == 0) {
				(typeof gameover === 'function') && gameover();
			}
		});
	},
	// 点击执行方法
	onclick: function (e, ths) {
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
	newcoin: function (e) {
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
	(i > 0 && j > 0) && setTimeout(function () {
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
