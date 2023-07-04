import fetchJsonp from "../utils/fetchJsonp.js";

const onSearchKeyInput = function () {
    // fetch('https://www.baidu.com/sugrec');   //Access to fetch at 'https://www.baidu.com/sugrec' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    fetchJsonp({
        // url: 'https://www.baidu.com/sugrec',
        url: 'http://localhost:3000/api/sugrec',
        // 用于指定 jsonp 回调函数名的参数
        callbackParam: 'cb',
        data: { wd: this.value, prod: 'pc' }    //（百度这个接口不加 prod 参数就不返回内容）
    })
        .then(console.log)
        .catch(console.warn)
}

const searchInput = document.getElementById('search-key');
searchInput.addEventListener('input', onSearchKeyInput);