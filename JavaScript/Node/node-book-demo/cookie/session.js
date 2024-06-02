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

const getSession = (req, res) => {
    const sessionId = req.cookies[SESSION_ID_KEY_IN_COOKIE];
    if (!sessionId) {
        req.session = generateSession();
    }
}