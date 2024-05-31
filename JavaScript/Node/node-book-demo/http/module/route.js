const { queuedQueryPromises } = require('./utils');
// import queuedQuery from "../../event-queue-query/index.js";

const ORG_PATTERN = /^[a-zA-Z0-9_\-]{1,20}$/;

/**
 * 查询路线列表
 * @returns {object}
 */
const getRoutes = async query => {
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
        return {
            status: 500,
            body: [],
        };
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
const handleRoute = async (method, query) => {
    switch (method) {
        case 'GET': {
            return await getRoutes(query);
        }
    }
}

module.exports = handleRoute;