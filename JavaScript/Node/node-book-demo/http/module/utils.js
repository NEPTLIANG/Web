const queuedQuery = require('../../event-queue-query');

class Response {
    status = 100;
    body = '';

    constructor(status, body) {
        if (Number.isNaN(+status)) { console.error('响应构造参数错误'); }
        this.status = status;
        this.body = body;
    }
}

const queuedQueryPromises = sql => new Promise(async (resolve, reject) => {
    try {
        await queuedQuery(sql, (error, result) => {
            if (error) { reject(error); }
            resolve(result);
        })
    } catch (e) {
        reject(e);
    };
});

const ERROR = {
    DUPLICATE_URL_QUERY: {
        message: 'DUPLICATE_URL_QUERY',
        response: new Response(400, { message: '参数重复' }),
    },
};

const throwErrorWhenDuplicated = () => {
    throw new Error(ERROR.DUPLICATE_URL_QUERY.message);
}

const handleDuplicateUrlQuery = (query, name) => {
    throwErrorWhenDuplicated(query, name);
};

const handleIfUrlQueryDuplicate = (query, parametersName) => (
    parametersName.map(name =>
        Array.isArray(query[name]) ?
            handleDuplicateUrlQuery(query, name)
            :
            query[name]
    )
);

const handleFail = e => {
    return ERROR[e.message]?.response;
}

module.exports = {
    Response,
    queuedQueryPromises,
    handleDuplicateUrlQuery,    //todo: 考虑去除
    handleIfUrlQueryDuplicate,
    handleFail,
}