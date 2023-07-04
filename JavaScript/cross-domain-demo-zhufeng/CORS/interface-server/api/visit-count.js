module.exports = app => app.get('/api/visit-count', (request, response) => {
    let count = request.cookies.count || 0;
    response.cookie('count', ++count);      //向客户端写 cookie
    response.json({ count });
});