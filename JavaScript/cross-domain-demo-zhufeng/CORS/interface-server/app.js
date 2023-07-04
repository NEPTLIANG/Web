const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// 默认情况下 req.body 是undefined，并且当您使用 body-parsing 中间件（例如express.json()或 express.urlencoded()）时它会被填充。（https://expressjs.com/en/4x/api.html#req.body）
app.use(express.json());    //解析 json 请求体
app.use(express.urlencoded({ extended: true }));    //解析 x-www-form-urlencoded
// 当使用cookie-parser中间件时，req.cookies 属性是一个包含请求发送的 cookie 的对象。不使用时是 undefined
app.use(cookieParser());

const ALLOW_ORIGIN_WHITE_LIST = ['http://localhost:3000'];
app.use((request, response, next) => {
    const origin = request.header('origin');
    if (ALLOW_ORIGIN_WHITE_LIST.includes(origin)) {
        // 设置允许哪些来源跨域访问，*代表允许任何来源
        //如果客户在请求时配置了 credentials: 'include'，那么 Access-Control-Allow-Origin 就不能设置为*
        response.header('Access-Control-Allow-Origin', origin);
    }
    // 如果客户端携带了 cookies，服务器在预检的时候需要返回这样一个响应头，否则前端调 fetch 报 Uncaught (in promise) TypeError: Failed to fetch
    response.header('Access-Control-Allow-Credentials', 'true');
    // 允许客户端跨域传递的请求头
    response.header('Access-Control-Allow-Headers', 'Content-Type');    //Content-Type 默认是被 CORS 阻止的
    // 指定跨域的时候向客户端暴露的响应头。不指定的话也会传响应头，但是前端 JS 读出来的值是 null
    response.header('Access-Control-Expose-Headers', 'custom-response-header');
    response.header('custom-response-header', 'custom');    //向客户端发送上述自定义响应头
    // 正常情况下客户端跨域向服务器发请求时，会先发一个预检请求，判断是否允许跨域。
    // 设置预检请求的结果可以缓存多少秒，缓存期间不再发送预检请求
    response.header('Access-Control-Max-Age', '300');
    // 如果客户端发过来的是一个预检用的 OPTIONS 请求，那么可以直接返回，因为这种请求只需要有响应头，不需要响应体
    if (request.method === 'OPTIONS') {
        return response.sendStatus(200);
    }
    next();
})

require('./api/users')(app);
require('./api/visit-count')(app);

const INTERFACE_PORT = 4000;
app.listen(INTERFACE_PORT, () => console.log(`Interface server running at port ${INTERFACE_PORT}`));