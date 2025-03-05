const mariadb = require('mariadb');
const { password } = require('./conf/_secret');

/**
 * 基本的 SQL 查询
 * https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
 */

const pool = mariadb.createPool({
    // socketPath: '/run/mysqld/mysqld.sock',
    user: 'lmliang',
    password,
    connectionLimit: 5,
});

/**
 * 执行 SQL
 * @param {string} sql 要执行的 SQL
 * @param {(Error | null, <Row>[]?) => unknown} callback 兼容回调方式调用
 * @returns {<Row>[]} 查询返回的行
 */
const execute = async (sql, callback) => {
    let connection/* : mariadb.PoolConnection | null */ /* = null */;
    let rows;
    try {
        connection = await pool.getConnection();
        rows = await connection.query(sql);
        // console.log('Queried', rows);   //测试事件队列
    } catch (error) {
        callback?.(error);
        throw error;
    } finally {
        connection?.end();
    }
    callback?.(null, rows);
    return rows;
};

module.exports = execute;