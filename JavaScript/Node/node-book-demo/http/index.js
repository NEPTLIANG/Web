const http = require('http');
const url = require('url');
// const https = require('https');
// const fs = require('fs');
// const path = require('path');

const handleRouter = require('./router');
const { handleFail } = require('./module/utils');

//! debug
// process.on('uncaughtException', error => {
//     console.log('未捕获：', error);
// });

// const options = {
//     key: fs.readFileSync(path.resolve(__dirname, '_secret/ssl-keys/server.key')),
//     cert: fs.readFileSync(path.resolve(__dirname, '_secret/ssl-keys/server.crt')),
// };

// https.createServer(options, async (req, res) => {
http.createServer(async (req, res) => {
    const { method, /* url: urlString *//* , headers */ } = req;
    const { pathname, query } = url.parse(req.url, true);
    let result;
    try {
        result = await handleRouter(method, pathname, query);
    } catch (e) {
        result = handleFail(e);
    }
    const {
        status = 500,
        body,
    } = result || {};
    res.writeHead(status, {
        'Content-Type': 'text/plain',
    });
    res.end(JSON.stringify(body));
})
    .listen(80/* 443 *//* , '127.0.0.1' */);

console.log('Running');