import { getSession } from '../../cookie/session';

const authenticate = req => {
    getSession(req);
    console.log({req});
}

// const