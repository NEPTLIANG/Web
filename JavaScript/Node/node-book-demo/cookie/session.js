const crypto = require('crypto');
const store = {};

const sessions = {};
const SESSION_ID_KEY_IN_COOKIE = 'session_id';
const EXPIRES = 20 * 60 * 1000;

/**
 * 生成session
 * @returns {object}
 */
const generateSession = () => {
    const session = {};
    const now = (new Date()).getTime();
    session.id = now + Math.random();
    session.cookie = {
        // 设定超时时间
        expire: now + EXPIRES,
    };
    sessions[session.id] = session;
    return session;
};

/**
 * 每个请求到来时，检查Cookie中的Session ID与服务器端的数据，如果过期，就重新生成
 * @param {object} req 请求对象
 * @param {object} res 响应对象
 */
const getSession = (req, res) => {
    const sessionId = req.cookies[SESSION_ID_KEY_IN_COOKIE];
    if (!sessionId) {
        req.session = generateSession();
    } else {
        const session = sessions[sessionId];
        if (session) {
            const now = (new Date()).getTime();
            if (session.cookie.expire > now) {
                // 未超时，更新 session 的超时时间
                session.cookie.expire = now + EXPIRES;
                req.session = session;
            } else {
                // 超时了，删除旧的 session，并重新生成
                delete sessions[sessionId];
                req.session = generateSession();
            }
        } else {
            // 如果session过期或session id不对，重新生成session
            req.session = generateSession();
        }
    }
    // handle(req, res);
};

/**
 * 在响应给客户端时设置新的值，以便下次请求时能够对应服务器端的数据。
 * hack响应对象的writeHead()方法，在它的内部注入设置Cookie的逻辑
 * @param {object} req 请求对象
 * @param {object} res 响应对象
 */
const hackWriteHead = (req, res) => {
    const primitiveWriteHead = res.writeHead;
    res.writeHead = function (...args) {
        const cookies = res.getHeader('Set-Cookie');
        const sessionIdCookie = `${SESSION_ID_KEY_IN_COOKIE}=${req.session.id}`;
        cookies = Array.isArray(cookies) ?
            cookies.concat(sessionIdCookie)
            :
            [cookies, sessionIdCookie];
        res.setHeader('Set-Cookie', cookies);
        return primitiveWriteHead.apply(this, args);
    };
};

// /**
//  * 为了解决性能问题和Session数据无法跨进程共享的问题，常用的方案是将Session集中化，
//  * 将原本可能分散在多个进程里的数据，统一转移到集中的数据存储中
//  * 目前常用的工具是Redis、Memcached等
//  * 一旦Session需要异步的方式获取，代码就需要略作调整，变成异步的方式
//  * @param {object} req 请求对象
//  * @param {object} res 响应对象
//  */
// const getSessionFromStore = (req, res) => {
//     const sessionId = req.cookies[SESSION_ID_KEY_IN_COOKIE];
//     if (!sessionId) {
//         req.session = generateSession();
//         // handle(req, res);
//     } else {
//         store.get?.(sessionId, (err, session) => {
//             if (session) {
//                 const now = (new Date()).getTime();
//                 if (session.cookie.expire > now) {
//                     // 未超时，更新 session 的超时时间
//                     session.cookie.expire = now + EXPIRES;
//                     req.session = session;
//                 } else {
//                     // 超时了，删除旧的 session，并重新生成
//                     delete sessions[sessionId];
//                     req.session = generateSession();
//                 }
//             } else {
//                 // 如果session过期或session id不对，重新生成session
//                 req.session = generateSession();
//             }
//             // handle(req, res);
//         });
//     }
// };

// /**
//  * 在响应时，将新的session保存回缓存中
//  * @param {object} req 请求对象
//  * @param {object} res 响应对象
//  */
// const hackWriteHeadWithStore = (req, res) => {
//     const primitiveWriteHead = res.writeHead;
//     res.writeHead = function (...args) {
//         const cookies = res.getHeader('Set-Cookie');
//         const sessionIdCookie = [SESSION_ID_KEY_IN_COOKIE, req.session.id];
//         cookies = Array.isArray(cookies) ?
//             cookies.concat(sessionIdCookie)
//             :
//             [cookies, sessionIdCookie];
//         res.setHeader('Set-Cookie', cookies);
//         // 保存回缓存
//         store.seve?.(req.session);
//         return primitiveWriteHead.apply(this, args);
//     };
// };

// /**
//  * 将 session ID 通过私钥加密进行签名，使得伪造的成本较高
//  */
// class SessionIdSignature {
//     signature = '';

//     /**
//      * 将值通过私钥签名
//      * @param {string} sessionId Session ID
//      * @param {string} secret 秘钥
//      * @returns {string} SHA256 签名后 base64 再去除等号
//      */
//     sign(sessionId, secret) {
//         this.signature = crypto.createHmac('sha256', secret)
//             .update(sessionId)
//             .digest('base64')
//             .replace(/\=+$/, '');
//         return this.signature;
//     }
    
//     unsign(sessionId, secret) {
//         return this.sign(sessionId, secret) === this.signature ?
//             sessionId : false;
//     }

//     constructor(sessionId) {
//         this.signature = this.sign(sessionId, secret);
//     }
// }

/**
 * 将值通过私钥签名
 * @param {string} sessionId Session ID
 * @param {string} secret 私钥
 * @returns {string} SHA256 签名后 base64 再去除等号
 */
const sign = (sessionId, secret) => 
    crypto.createHmac('sha256', secret)
        .update(sessionId)
        .digest('base64')
        .replace(/\=+$/, '');

/**
 * 取出口令部分进行签名，对比用户提交的值
 * @param {string} sessionId Session ID
 * @param {string} signature 签名
 * @param {string} secret 私钥
 * @returns {string | boolean} 匹配则返回 session ID，否则返回 false
 */
const unsign = (
    sessionId,
    signature,
    secret
) => sign(sessionId, secret) === signature ?
    sessionId : false;

module.exports = {
    getSession,
}