var rotate = 0;  //设置轮盘3D旋转角度
var left = -50 + "%";  //设置中间日期位置偏移，默认-50%

// 实现父div居中
// var width = window.innerWidth;
var height = window.innerHeight;
var father = document.getElementsByClassName("father");
// var heightOfFather = father[0].style.height;
// father[0].style.left = (width / 2).toString();
// father[0].style.position = "fixed";
father[0].style.left = "50%";
father[0].style.top = (height / 2 - 204).toString() + "px";

// 生成轮盘的准备工作
var num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "", "", "", "", "", "", ""];
var num2 = ["十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "", "", "",];
var wheelOfSeconds = document.getElementById("wheelOfSeconds");
var wheelOfMinutes = document.getElementById("wheelOfMinutes");
var wheelOfHours = document.getElementById("wheelOfHours");
var hours = [], minutes = [], seconds = [];
var i;
var initTime = new Date();
var initSecond = initTime.getSeconds();
var initMinute = initTime.getMinutes() + initSecond / 60;
var initHour = initTime.getHours() + initMinute / 60;

// 拼接秒和分钟文字并插到轮盘div里
for (i = 0; i < 60; i++) {
    seconds.push(document.createElement("div"));
    minutes.push(document.createElement("div"));
    // seconds.innerHTML = "第" + i.toString() + "秒";
    // minutes.innerHTML = "第" + i.toString() + "秒";
    if (i === 0) {
        seconds[i].innerHTML = "整";
        minutes[i].innerHTML = "零分";
    }
    if (i > 0 && i <= 10) {
        seconds[i].innerHTML = "零" + num[i] + "秒";
        minutes[i].innerHTML = "零" + num[i] + "分";
    }
    if (i >= 10 && i < 20) {
        seconds[i].innerHTML = num2[i % 10] + "秒";
        minutes[i].innerHTML = num2[i % 10] + "分";
    }
    if (i >= 20 && i < 60) {
        seconds[i].innerHTML = num[Math.floor(i / 10)] + num2[i % 10] + "秒";
        minutes[i].innerHTML = num[Math.floor(i / 10)] + num2[i % 10] + "分";
    }
    seconds[i].className = "seconds";
    minutes[i].className = "minutes";
    seconds[i].style = "transform: rotate(" + 6 * (i - initSecond) + "deg);";
    minutes[i].style = "transform: rotate(" + 6 * (i - initMinute) + "deg);";
    wheelOfSeconds.appendChild(seconds[i]);
    wheelOfMinutes.appendChild(minutes[i]);
}

// 拼接小时文字并插到轮盘div里
for (i = 0; i < 24; i++) {
    hours.push(document.createElement("div"));
    if (i === 0) {
        hours[i].innerHTML = "零时";
    }
    if (i > 0 && i <= 10) {
        hours[i].innerHTML = num[i] + "时";
    }
    if (i >= 10 && i < 20) {
        hours[i].innerHTML = num2[i % 10] + "时";
    }
    if (i >= 20 && i < 24) {
        hours[i].innerHTML = num[Math.floor(i / 10)] + num2[i % 10] + "时";
    }
    hours[i].className = "hours";
    hours[i].style = "transform: rotate(" + 15 * (i - initHour) + "deg);";
    wheelOfHours.appendChild(hours[i]);
}

// 更新时间文字样式的函数
var date, year, month, day, hour, minute, second;
/*function updateStyle() {
    date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    hours[hour].style = "color: #fff";
    minutes[minute].style = "color: #fff";
    seconds[second].style = "color: #fff";
}*/
// var lastHour;
var time = document.getElementById("time");
var dateDiv = document.getElementById("date");
function changeStyle() {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    time.innerHTML = hour.toString() + ":" + minute.toString();
    dateDiv.innerHTML = year + "." + month.toString() + "." + day.toString();
    // console.log(second);
    // console.log(typeof (hour));
    hours[hour].style.color = "#fff";
    hours[hour].style.textShadow = "rgba(255, 255, 255, 50) 0 0 1em";
    // lastHour = (hour + 24 - 1) % 24;
    hours[(hour + 24 - 1) % 24].style.color = "#0ff";
    hours[(hour + 24 - 1) % 24].style.color = "rgba(0, 255, 255, 50) 0 0 1em";
    minutes[minute].style.color = "#fff";
    minutes[minute].style.textShadow = "rgba(255, 255, 255, 100) 0 0 1em";
    minutes[(minute + 60 - 1) % 60].style.color = "#0ff";
    minutes[(minute + 60 - 1) % 60].style.color = "rgba(0, 255, 255, 50) 0 0 1em";
    seconds[second].style.color = "#fff";
    seconds[second].style.textShadow = "rgba(255, 255, 255, 50) 0 0 1em";
    // seconds[second].style.fontSize = "48px";
    seconds[(second + 60 - 1) % 60].style.color = "#0ff";
    seconds[(second + 60 - 1) % 60].style.color = "rgba(0, 255, 255, 50) 0 0 1em";
    // seconds[(second + 60 - 1) % 60].style.fontSize = "32px";
}

//设置轮盘3D旋转
father[0].style.transform = `rotate3d(-1, 1, 0, ${rotate}deg)`;
// transform: rotate3d(-1, 1, 0, 45deg);
time.style.transform = `rotate3d(1, 1, 0, ${rotate}deg)`;
dateDiv.style.transform = `rotate3d(1, 1, 0, ${rotate}deg)`;
dateDiv.style.left = left;
// var position = 50 - (rotate * 0.2);
// dateDiv.style.left = `-${position}%`;
// console.log(`-${position}%`);

// 设置更新轮盘上的文字样式
setInterval(changeStyle, 100);