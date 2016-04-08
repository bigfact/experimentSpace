// 原始引入的图片
var himg = document.getElementById('himg');
// 编辑图片的canvas
var editpic = document.getElementById('editpic');
var createCanvas = editpic.getContext("2d");
// 预览图片
var targetimg = document.getElementById('targetimg');
// 裁剪框
var cankao = document.getElementById('cankao');

// 原始图片加载完成，初始化
himg.onload = function () {
    editpic.width = himg.clientWidth;
    editpic.height = himg.clientHeight;
    createCanvas.drawImage(himg, 0, 0, himg.naturalWidth, himg.naturalHeight, 0, 0, himg.clientWidth, himg.clientHeight);
    himg.onload = null;
    himg.src = editpic.toDataURL();
    cankao.style.left = himg.offsetLeft + 'px';
    cankao.style.top = himg.offsetTop + 'px';
}

// 监听事件
himg.addEventListener('mousedown', cutStart, false);
himg.addEventListener('touchstart', cutStart, false);
cankao.addEventListener('mousedown', cakaoMoveStart, false);
cankao.addEventListener('touchstart', cakaoMoveStart, false);

// 裁剪框拉伸开始
var event_state = {};
function cutStart(e) {
    // console.log(getSpotPosition(e));
    cankao.style.display = 'block';
    e.preventDefault();
    e.stopPropagation();
    event_state.x = getSpotPosition(e).x;
    event_state.y = getSpotPosition(e).y;
    cankao.style.width = '0';
    cankao.style.height = '0';
    cankao.style.left = event_state.x + 'px';
    cankao.style.top = event_state.y + 'px';
    document.addEventListener('mousemove', cuting, false);
    document.addEventListener('touchmove', cuting, false);
    document.addEventListener('mouseup', cutEnd, false);
    document.addEventListener('touchend', cutEnd, false);
}

// 裁剪框拉伸中
function cuting(e) {      
    var mouse = {};
    e.preventDefault();
    e.stopPropagation();
    mouse.x = getSpotPosition(e).x;
    mouse.y = getSpotPosition(e).y;
    var w = mouse.x - event_state.x;
    var h = mouse.y - event_state.y;
    cankao.style.width = (w > 0 ? w : 1) + 'px';
    cankao.style.height = (h > 0 ? h : 1) + 'px';
    editpic.width = (w > 0 ? w : 1) * 1;
    editpic.height = (h > 0 ? h : 1) * 1;
}

// 裁剪框拉伸结束
function cutEnd(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', cuting, false);
    document.removeEventListener('touchmove', cuting, false);
    document.removeEventListener('mouseup', cutEnd, false);
    document.removeEventListener('touchend', cutEnd, false);
}

// 裁剪框移动开始
function cakaoMoveStart(e) {
    e.preventDefault();
    e.stopPropagation();
    event_state.x = cankao.offsetLeft - getSpotPosition(e).x;
    event_state.y = cankao.offsetTop - getSpotPosition(e).y;
    document.addEventListener('mousemove', cakaoMoveing, false);
    document.addEventListener('touchmove', cakaoMoveing, false);
    document.addEventListener('mouseup', cakaoMoveEnd, false);
    document.addEventListener('touchend', cakaoMoveEnd, false);
}

// 裁剪框移动中
function cakaoMoveing(e) { 
    var mouse = {};
    e.preventDefault();
    e.stopPropagation();
    mouse.x = getSpotPosition(e).x;
    mouse.y = getSpotPosition(e).y;
    cankao.style.left = ((mouse.x + event_state.x) > 0 ? (mouse.x + event_state.x) : 0) + 'px';
    cankao.style.top = ((mouse.y + event_state.y) > 0 ? (mouse.y + event_state.y) : 0) + 'px';
}

// 裁剪框移动结束
function cakaoMoveEnd(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', cakaoMoveing, false);
    document.removeEventListener('touchmove', cakaoMoveing, false);
    document.removeEventListener('mouseup', cakaoMoveEnd, false);
    document.removeEventListener('touchend', cakaoMoveEnd, false);
}
    
// 确认裁剪
function cutConfirm() {
    createCanvas.drawImage(
        himg,
        cankao.offsetLeft - himg.offsetLeft,
        cankao.offsetTop - himg.offsetTop,
        cankao.clientWidth,
        cankao.clientHeight,
        0,
        0,
        editpic.width,
        editpic.height
        );
    targetimg.src = editpic.toDataURL();
}

// 根据事件对象获取接触点的坐标
function getSpotPosition(e) {
    var touches = {};
    if(e.touches != undefined) {
        touches.x = e.touches[0].clientX;
        touches.y = e.touches[0].clientY;
    }
    touches.x = (touches.x || e.clientX || e.pageX) + window.scrollX;
    touches.y = (touches.y || e.clientY || e.pageY) + window.scrollY;
    return touches;
}