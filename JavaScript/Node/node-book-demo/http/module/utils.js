const queuedQuery = require('../../event-queue-query');

const queuedQueryPromises = sql => new Promise((resolve, reject) => {
    queuedQuery(sql, (error, result) => {
        if (error) { reject(error); }
        resolve(result);
    });
})

module.exports = {
    queuedQueryPromises,
}