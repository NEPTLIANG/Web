const mariadb = require('mariadb');

const pool = mariadb.createPool({
    user: 'lmliang',
    connectionLimit: 5,
});

(async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        const rows = await connection.query('SELECT 1 as val')
        console.log(rows);
    } catch (error) {
        console.warn(error);
    } finally {
        connection?.end();
    }
})();

const select = () => { };