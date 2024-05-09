import events from 'events';
import execute from './basicQuery.js';

// 基于《深入浅出Node.js》4.3.1实现

const STATUS = {
    READY: 'ready',
    PENDING: 'pending',
}
const QUERY_ENDED = 'queryEnded';

/**
 * Node自身提供的`events`模块（http://nodejs.org/docs/latest/api/events/html）
 * 是发布/订阅模式的一个简单实现
 */
const proxy = new events.EventEmitter()
// 如果站点刚好启动，这时缓存中是不存在数据的，而如果访问量巨大，同一句SQL会被发送到数据库中反复查询，会影响服务的整体性能。一种改进方案是添加一个状态锁
let status = STATUS.READY;

/**
 * 事件队列方式的查询
 * @param {(Error | null, <Row>[]?) => unknown} callback 回调
 * @returns {void}
 */
const queuedQuery = (sql, callback) => {
    const onQueryEnd = param => {
        if (param instanceof Error) {
            return callback?.(param);
        }
        return callback?.(null, param);
    };
    // 在事件订阅/发布模式中，通常也会有一个`once()`方法，通过它添加的侦听器只能执行一次，执行之后就会将它与事件的关联移除
    proxy.once(QUERY_ENDED, onQueryEnd);
    if (status === STATUS.PENDING) { return; }
    status = STATUS.PENDING;
    // 雪崩问题，就是在高访问量、大并发量的情况下缓存失效的情景
    execute(sql, (error, results) => {
        status = STATUS.READY;
        if (error) {
            return proxy.emit(QUERY_ENDED, error);
        }
        proxy.emit(QUERY_ENDED, results);
    });
}

// 测试
// (function test() {
//     for (let i = 0; i < 10; i++) {
//         queuedQuery(
//             `select * 
//                 from RealTimeBusQuery.route`,
//             console.log,
//         );
//     }
// })();

export default queuedQuery;