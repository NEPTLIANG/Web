// 获取指定cookie
var getCookie = function (name) {
    var m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    return !m ? "" : decodeURIComponent(m[2]);
};


module.exports = {
    getCookie: getCookie
};
