const Promise = require('./promise')    //导入下文自己实现的 Promise
const promise = new Promise((resolve, reject) => {
    // throw new Error('出错了');      //executor 发生异常的时候，也会导致promise的失败
    // resolve('ok');      
    // reject('no ok');    //一个promise实例状态变化后，不能再重新地发生变化
    // console.log('Executor');    //executor里的是同步代码

    setTimeout(() => {
        resolve();
    }, 1000);
});

promise.then(
    data => console.log(`Succeeded 1: ${data}`),
    reason => console.log(`Failed: ${reason}`)
);
promise.then(
    data => console.log(`Succeeded 2: ${data}`),
    reason => console.log(`Failed: ${reason}`)
);

console.log(1);