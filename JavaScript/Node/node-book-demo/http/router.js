const handleRoute = require('./module/route');

const handleRouter = async (method, url) => {
    switch(url) {
        case '/route': {
            return await handleRoute(method);
        }
    }
}

module.exports = handleRouter;