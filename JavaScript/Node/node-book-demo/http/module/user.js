const { getSession } = require('../../cookie/session');
const {
    Response,
    handleIfUrlQueryDuplicate,
    queuedQueryPromises
} = require('./utils');

const authenticate = req => {
    getSession(req);
    console.log({req});
}

const queryPwd = async username => {
    const sql = `
        select pwd
            from RealTimeBusQuery.user where id='${username}'
    `;
    const result = await queuedQueryPromises(sql) || [];
    return result[0]?.pwd;
};

const USERNAME_PATTERN = /^[a-zA-Z0-9_\-]{1,20}$/;
const PWD_PATTERN = /^[a-fA-F0-9]{128}$/;

const getUser = query => {
    handleIfUrlQueryDuplicate(query, ['username', 'pwd']);
    let {
        username = '',
        pwd = ''
    } = query;
    username = username.trim?.();
    pwd = pwd.trim?.();
    if (!USERNAME_PATTERN.test?.(username)
        || !PWD_PATTERN.test?.(pwd)
    ) { return new Response(400, { message: '不合法的值' }); }
    let realPwd = '';
    try {
        realPwd = queryPwd(username);
    } catch (e) {
        console.error('查询失败', e);
        return new Response(500, { message: '内部错误' });
    }
    return realPwd === pwd ?
        new Response(200) : new Response(400, { message: '用户不存在或密码错误' });
    // authenticate(query);
}

const HANDLERS = {
    'GET': getUser,
}

const handleUser = (method, query) => HANDLERS[method]?.(query);

module.exports = handleUser;