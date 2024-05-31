const handleRoute = require('./module/route');

const handleRouter = async (method, pathname, query) => {
    switch(pathname) {
        case '/route': {
            return await handleRoute(method, query);
        }
    }
    return {
        status: 404,
        body: { message: '没有找到路由' },
    };
}

module.exports = handleRouter;