import http from 'http';
import { handleRouter } from './module/utils.js';

http.createServer(async (req, res) => {
    const { method, url/* , headers */ } = req;
    const { status, body } = await handleRouter(method, url);
    res.writeHead(status, {
        'Content-Type': 'text/plain',
    });
    res.end(JSON.stringify(body));
})
    .listen(80, '127.0.0.1');

console.log('Running');