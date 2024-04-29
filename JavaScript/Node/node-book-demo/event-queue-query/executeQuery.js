import mariadb from 'mariadb';

const pool = mariadb.createPool({
    socketPath: '/run/mysqld/mysqld.sock',
    user: 'lmliang',
    connectionLimit: 5,
});

/**
 * 执行 SQL
 * https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
 * @param {string} sql 要执行的 SQL
 * @param {Function} callback 兼容回调方式调用
 * @returns {<Row>[]} 查询返回的行
 */
const execute = async (sql, callback) => {
    let connection/* : mariadb.PoolConnection | null */ /* = null */;
    let rows;
    try {
        connection = await pool.getConnection();
        rows = await connection.query(sql);
        // console.log('Queried', rows);   //测试
    } catch(error) {
        callback?.(error);
        throw error;
    } finally {
        connection?.end();
    }
    callback?.(null, rows);
    return rows;
};

export {
    execute,
}