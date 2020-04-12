window.addEventListener("load", (function () {
    for (var i=1; i<=4; i++) {
        var img = document.createElement("img");
        img.setAttribute("src", "static/img/" + i + ".jpg");
        img.className = "image";
        img.style = "width: 80%;";
        this.document.getElementById("main").appendChild(img);
    }
}), false);

// var bodyDiv = document.getElementById("body");

function getMore() {
    var scrollTop = document.documentElement.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight;
    // var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    // var clientHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
    // var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    // console.log(document.documentElement.scrollTop);
    // console.log(document.documentElement.clientHeight);
    // console.log(document.documentElement.scrollHeight);
    if (scrollTop+clientHeight >= scrollHeight) {
        var moreDiv = document.getElementById("more");
        moreDiv.innerHTML = "正在加载";
        setTimeout(function () {
            moreDiv.innerHTML = '上滑加载更多';
        }, 1000);
    }
    var body = document.getElementsByTagName("body")[0];
    body.style.transition = "1s ease";
    body.style.transform = "translate(0, 0)";
    // console.log(e);
    // if (e.touches[0].clientY > startY+192) {
    //     update();
    // }
}
addEventListener("touchend", getMore, false);

var startY;
// bodyDiv.ontouchstart = (function (e) {
addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
})

// bodyDiv.ontouchmove = (function (e) {
addEventListener("touchmove", function (e) {
    var body = document.getElementsByTagName("body")[0];  //注意byTagName返回的是数组
    var updateDiv = document.getElementById("update");
    body.style.transition = "0s";
    if (document.documentElement.scrollTop==0 && startY<e.touches[0].clientY && e.touches[0].clientY<startY+256) {
        var top = e.touches[0].clientY-startY;
        body.style.transform = "translate(0," + top + "px)";
        if (e.touches[0].clientY > startY+192) {
            updateDiv.innerText = "释放刷新";
        }
        // console.log(document.getElementsByTagName("body"));
    }
})

var update = function () {
    setTimeout((function () {
        document.getElementById("update").innerText = "下拉刷新";
    }), 1000);
}