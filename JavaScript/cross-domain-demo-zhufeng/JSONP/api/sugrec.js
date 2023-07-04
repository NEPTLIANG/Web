module.exports = app => app.get?.('/api/sugrec', (request, response) => {
    const {
        cb: callbackName,
        wd: word
    } = request.query;
    const data = JSON.stringify({
        g: Array.from(
            { length: 10 },
            (_, i) => ({ q: `${word}${i}` })
        )
    });
    response.send(`${callbackName}(${data})`);
});