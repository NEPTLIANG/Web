// const onReject = () => new Promise((_, reject) => reject(new Error('参数异常')));

/**
 * 拼接 query 参数
 * @param {object} data 查询参数数据
 * @returns {string} 拼接后的 query 字符串
 */
const concatQueryParam = (data) => Object.entries(data)
    .map(query => query.join('='))
    .join('&');

const fetchJsonp = ({
    url,
    callbackParam,
    data = {}
}) => new Promise((resolve, reject) => {
    if (typeof url !== 'string') { reject(new Error('参数异常')); }
    const script = document.createElement('script');
    // 拼装 jsonp 回调的函数名
    const callbackName = `jsonpCallback${Date.now()}`
    // 把 jsonp 回调挂到 window 上
    window[callbackName] = response => {
        // 把服务器返回的数据传给 resolve
        resolve(response);
        delete window[callbackName];
        document.head.removeChild(script);
    };
    script.src = `${url}${
        url.includes('?') ? '&' : '?'   //如果用户给的 URL 里已经有了“?”，就通过“&”在后面追加参数
    }${callbackParam}=${callbackName}&${concatQueryParam(data)}`;
    document.head.appendChild(script);
});

export default fetchJsonp;