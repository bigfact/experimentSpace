function init(){timenow=0,point=0,time=timeall,tabtime.innerText=timeall,tabpoint.innerText=point,reset.setAttribute("disabled","disabled"),null!=coins&&coins.parentNode.removeChild(coins),coins=doc.createElement("div"),doc.getElementsByClassName("gameblock")[0].appendChild(coins),reset.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),0==time&&init()},!1),reset.addEventListener("touchstart",function(t){t.preventDefault(),t.stopPropagation(),0==time&&init()},!1),doc.getElementsByClassName("gameblock")[0].addEventListener("click",onclick,!1),doc.getElementsByClassName("gameblock")[0].addEventListener("touchstart",onclick,!1),0==point&&clock(timeall,1e3,function(t){tabtime.innerText=t,time=t,0==time&&reset.removeAttribute("disabled")})}function onclick(t){t.preventDefault(),t.stopPropagation(),time>0&&Date.now()-timenow>mintime&&(timenow=Date.now(),point++,newcoin(t)),tabpoint.innerText=point}function clock(t,e,n){t>0&&e>0&&setTimeout(function(){t--,n(t),clock(t,e,n)},e)}function newcoin(t){var e=doc.createElement("div");e.className="coin",e.style.top=getSpotPosition(t).y-50+"px",e.style.left=getSpotPosition(t).x-50+"px",coins.appendChild(e)}function getSpotPosition(t){var e={};return void 0!=t.touches&&(e.x=t.touches[0].clientX,e.y=t.touches[0].clientY),e.x=e.x||t.clientX||t.pageX,e.y=e.y||t.clientY||t.pageY,e}$(doc).ready(function(){var t=!1;$(".activetime button").on("touchstart click",function(e){t&&$("#makesure").show(),!t&&$("#login").show()}),$("#makesure .close i").on("touchstart click",function(){$("#makesure").hide()}),$("#makesure .footer").on("touchstart click",function(){$(".activetime").hide(),$(".gameblock").show(),$(".infoblock").addClass("infoblock2"),$("#makesure").hide(),$(".countdown").show(),clock(4,1e3,function(t){if(0==t)$(".countdown").hide(),init();else{var e=t-1;0==e&&(e="GO!"),$(".countdown span").text(e)}})}),$("#login button").on("touchstart click",function(){$("#login").hide(),t=!0})});var doc=document,timeall=10,tabtime=doc.getElementsByClassName("tabtime")[0],tabpoint=doc.getElementsByClassName("tabpoint")[0],point=0,time=timeall,coins=null,mintime=60,timenow=0,reset=doc.getElementsByClassName("reset")[0];