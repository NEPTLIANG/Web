const { Response } = require('./module/utils');

const handleRoute = require('./module/route');
const handleUser = require('./module/user');

const handleRouter = async (method, pathname, query) => {
    switch(pathname) {
        case '/route': {
            return await handleRoute(method, query);
        }
        case '/login': {
            return await handleUser(method, query);
        }
    }
    return new Response(404, { message: '没有找到路由' });
};

module.exports = handleRouter;