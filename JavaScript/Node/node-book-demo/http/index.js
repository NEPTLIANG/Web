const http = require('http');
// const https = require('https');
// const fs = require('fs');
// const path = require('path');
const handleRouter = require('./router');

// const options = {
//     key: fs.readFileSync(path.resolve(__dirname, '_secret/ssl-keys/server.key')),
//     cert: fs.readFileSync(path.resolve(__dirname, '_secret/ssl-keys/server.crt')),
// };

// https.createServer(options, async (req, res) => {
http.createServer(async (req, res) => {
    const { method, url/* , headers */ } = req;
    const { status, body } = await handleRouter(method, url);
    res.writeHead(status, {
        'Content-Type': 'text/plain',
    });
    res.end(JSON.stringify(body));
})
    .listen(80/* 443 *//* , '127.0.0.1' */);

// console.log('Running');