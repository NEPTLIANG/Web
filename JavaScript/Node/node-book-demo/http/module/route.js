const {
    Response,
    queuedQueryPromises,
    handleDuplicateUrlQuery,
} = require('./utils');
// import queuedQuery from "../../event-queue-query/index.js";

const ORG_PATTERN = /^[a-zA-Z0-9_\-]{1,20}$/;

/**
 * 查询路线列表
 * @returns {object}
 */
const getRoutes = async query => {
    // 如果查询字符串中的键出现多次，那么它的值会是一个数组
    if (Array.isArray(query.org)) {
        query.org = handleDuplicateUrlQuery(query);
    }
    let sql = `
        select id, name, org, intro
            from RealTimeBusQuery.route
    `;
    const org = query.org?.trim?.();
    if (typeof org === 'string'
        && ORG_PATTERN.test(org)
    ) {
        sql += `
            where org='${org}'
        `;
    }
    let routes = [];
    try {
        routes = await queuedQueryPromises(sql);
    } catch (e) {
        // throw e;
        return new Response(500, {
            message: '查询失败',
        });
    }
    // queuedQuery(
    //     `select * 
    //         from RealTimeBusQuery.route`,
    //     (error, result) => {
    //         // console.log(error, result);
    //         if (error) { throw error; }
    //         routes = result;
    //     },
    // );
    return new Response(200, routes);
};

/**
 * 分发路线相关请求
 * @param {string} method 请求方法
 * @returns {object}
 */
const handleRoute = async (method, query) => {
    switch (method) {
        case 'GET': {
            return await getRoutes(query);
        }
    }
}

module.exports = handleRoute;