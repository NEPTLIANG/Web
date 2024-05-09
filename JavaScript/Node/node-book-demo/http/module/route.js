import { queuedQueryPromises } from "./utils.js";
// import queuedQuery from "../../event-queue-query/index.js";

const getRoute = async () => {
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

const handleRoute = async (method) => {
    switch (method) {
        case 'GET': {
            return await getRoute();
        }
    }
}

export default handleRoute;