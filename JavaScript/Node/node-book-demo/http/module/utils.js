const queuedQuery = require('../../event-queue-query');

// 通用错误配置
const ERROR_CONF = {
    DUPLICATE_URL_QUERY: {
        message: 'DUPLICATE_URL_QUERY',
        response: new Response(400, { message: '参数重复' }),
    },
};

// 用于构造响应
class Response {
    status = 100;
    body = '';

    constructor(status, body) {
        if (Number.isNaN(+status)) { console.error('响应构造参数错误'); }
        this.status = status;
        this.body = body;
    }
}

/**
 * 将《深入浅出Node.js》中的回调式队列化查询封装成 Promise API
 * @param {string} sql 要查询的 SQL 语句
 * @returns {Promise}
 */
const queuedQueryPromises = sql => new Promise(async (resolve, reject) => {
    try {
        /* return */ await queuedQuery(sql, (error, result) => {
            if (error) { reject(error); }
            resolve(result);
        })
    } catch (e) {
        reject(e);
    };
});

// 查询参数重复时抛出异常
const throwErrorWhenDuplicated = () => {
    throw new Error(ERROR_CONF.DUPLICATE_URL_QUERY.message);
}

/**
 * 查询参数重复处理
 * @param {object} query 查询参数对象
 * @param {string} name 参数名
 */
const handleDuplicateUrlQuery = (query, name) => {
    throwErrorWhenDuplicated(query, name);
};

/**
 * 判断参数是否重复并进行处理
 * @param {object} query 查询参数对象
 * @param {string[]} parametersName 要处理的参数名列表
 * @returns {string[] | undefined} 处理结果
 */
const handleIfUrlQueryDuplicate = (query, parametersName) => (
    parametersName.map(name =>
        // 如果查询字符串中的键出现多次，那么它的值会是一个数组
        Array.isArray(query[name]) ?
            handleDuplicateUrlQuery(query, name)
            :
            query[name]
    )
);

/**
 * 通用错误处理
 * @param {Error} e 错误对象
 * @returns {object} 响应配置
 */
const handleFail = e => ERROR_CONF[e.message]?.response;

module.exports = {
    Response,
    queuedQueryPromises,
    handleIfUrlQueryDuplicate,
    handleFail,
}