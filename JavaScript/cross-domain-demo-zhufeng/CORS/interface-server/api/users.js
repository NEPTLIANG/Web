module.exports = app => {
    const users = [{
        id: 1,
        name: '张三'
    }];

    app.get('/api/users', (_, response) => {
        response.json(users);
    });

    app.post('/api/users', (request, response) => {
        const newUser = request.body;
        newUser.id = users[users.length - 1].id + 1;
        users.push(newUser);
        response.json(users);
    });
};