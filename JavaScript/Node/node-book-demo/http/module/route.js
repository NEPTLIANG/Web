const { queuedQueryPromises } = require('./utils');
// import queuedQuery from "../../event-queue-query/index.js";

/**
 * 查询路线列表
 * @returns {object}
 */
const getRoutes = async () => {
    let routes = [];
    routes = await queuedQueryPromises(`
        select * 
            from RealTimeBusQuery.route
    `);
    // queuedQuery(
    //     `select * 
    //         from RealTimeBusQuery.route`,
    //     (error, result) => {
    //         // console.log(error, result);
    //         if (error) { throw error; }
    //         routes = result;
    //     },
    // );
    return {
        status: 200,
        body: routes,
    };
};

/**
 * 分发路线相关请求
 * @param {string} method 请求方法
 * @returns {object}
 */
const handleRoute = async method => {
    switch (method) {
        case 'GET': {
            return await getRoutes();
        }
    }
}

module.exports = handleRoute;