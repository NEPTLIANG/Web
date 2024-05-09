import handleRoute from "./route.js";
import queuedQuery from "../../event-queue-query/index.js";

const handleRouter = async (method, url) => {
    switch(url) {
        case '/route': {
            return await handleRoute(method);
        }
    }
}

const queuedQueryPromises = sql => new Promise((resolve, reject) => {
    queuedQuery(sql, (error, result) => {
        if (error) { reject(error); }
        resolve(result);
    });
})

export {
    handleRouter,
    queuedQueryPromises,
}