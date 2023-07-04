const ANOTHER_DOMAIN_URL = 'http://localhost:4000'

const sendToAnotherDomain = () => {
    const iframe = document.getElementById('main-content');
    iframe.addEventListener('load', function () {
        const message = 'Li Lei';
        // 往 iframe 里发一条跨域的消息
        this.contentWindow.postMessage(message, ANOTHER_DOMAIN_URL);    //如果不写第二个参数（targetOrigin）就会被拦截
    });
}

const listenAnotherDomain = () => {
    window.addEventListener('message', function (e) {
        if (e.origin !== ANOTHER_DOMAIN_URL) { return; }    //只监听指定域的消息，跳过其他消息
        const titleBox = document.getElementById('title');
        titleBox.innerHTML = e.data;
    });
}

sendToAnotherDomain();
listenAnotherDomain();