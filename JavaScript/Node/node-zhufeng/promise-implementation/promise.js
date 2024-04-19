const PENDING = 'PENDING';
const FULFILLED = 'FULFULLED';
const REJECTED = 'REJECTED';

class Promise {
    // Promise 实例的状态默认是等待态
    status = PENDING;
    // 成功时的值
    value = undefined;
    // 失败时的原因
    reason = undefined;
    /* promise 调用 then 的时候，可能状态依旧是 pending，那么我们需要将回调先存放起来，
        * 等待过一会调用 resolve 时触发 onFulfilledList 执行
        * 等待过一会调用 reject 时触发 onRejectedList 执行
    */
    onFulfilledList = [];
    onRejectedList = [];

    constructor(executor) {
        const resolve = value => {
            // 只有状态为 pending 的时候，才允许修改状态、改变成功和失败的原因
            if (this.status !== PENDING) { return; }
            this.value = value;
            this.status = FULFILLED;
            // this.onFulfilledList.reduce(this.value, (prev, next) => next(prev));
            // Promise 成功时调用成功的回调
            this.onFulfilledList.forEach(cb => cb());
        }
        const reject = reason => {
            if (this.status !== PENDING) { return; }
            this.reason = reason;
            this.status = REJECTED;
            // this.onRejectedList.reduce(this.reason, (prev, next) => next(prev));
            // Promise 失败时调用失败的回调
            this.onRejectedList.forEach(cb => cb());
        }
        // 异常处理：executor 内抛出异常时，promise 走向 reject 并传出异常对象作为 reason
        try {
            // 调用 executor 时自动传入 resolve 和 reject
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        // 1. 如果调用 then 时，promise 已经确定了是成功还是失败了：
        if (this.status === FULFILLED) {
            // ToDo...
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            // ToDo...
            onRejected(this.reason);
        }
        // 2. 如果调用 then 时，promise 还没确定是成功还是失败：
        if (this.status === PENDING) {
            this.onFulfilledList.push(() => {
                // ToDo...
                onFulfilled(this.value);
            });
            this.onRejectedList.push(() => {
                // ToDo...
                onRejected(this.reason);
            });
        }
    }
}

module.exports = Promise;