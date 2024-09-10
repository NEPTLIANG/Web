const queuedQuery = require('../../event-queue-query');

const queuedQueryPromises = sql => new Promise((resolve, reject) => {
    queuedQuery(sql, (error, result) => {
        if (error) { reject(error); }
        resolve(result);
    });
});

const ERROR = {
    DUPLICATE_URL_QUERY: {
        message: 'DUPLICATE_URL_QUERY',
        status: 400,
        body: { message: '参数重复' },
    },
};

const handleDuplicateUrlQuery = () => {
    throw new Error(ERROR.DUPLICATE_URL_QUERY.message);
};

const handleFail = e => {
    console.log(e.message);
    return ERROR[e.message];
}

module.exports = {
    queuedQueryPromises,
    handleDuplicateUrlQuery,
    handleFail,
}