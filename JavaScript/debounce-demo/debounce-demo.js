const isObject = value => {
    const type = typeof value;
    return value !== null
        && (type === 'object' || type === 'function');      //先排除null，然后判断typeof为object或function
};

const globalObj = (typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis)      //1. typeof; 2. 排除null； 3. 其Object是全局的Object
    || (typeof global === 'object' && global !== null && global.Object === Object && global)
    || (typeof self === 'object' && self !== null && self.Object === Object && self)
    || Function('return this')();   //globalThis > global > self > function的this，而且function的this得用Function构造函数，否则严格模式下返回undefined

const debounce = (func, wait, options) => {
    let result,
        timerId,
        lastThis,
        lastArgs,
        maxWait;
    let maxing = false;
    let leading = false
    let trailing = true;    //先声明options选项对应的变量，后面用isObject校验options后再赋值
    // console.log(Object.prototype.toString.call(null))
    let lastCallTime;   //lastCallTime不初始化，后面据此判断是否是首次触发
    let lastInvokeTime = 0;
    const useRAF = !wait && wait !== 0      //? 不是很明白为什么为零不为零都是 false
        && typeof globalObj.requestAnimationFrame === 'function';

    if (typeof func !== 'function') { throw new Error('Expected a function'); }     //抛出异常而非返回异常
    wait = +wait || 0;
    if (isObject(options)) {
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(+maxWait || 0, wait) : maxWait;     //对maxWait取max而非对wait取min
        leading = !!options.leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    // console.log({leading})


    const remainingWait = time => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        // console.log({ wait })
        const timeToNextCall = wait - timeSinceLastCall;
        const timeToNextInvoke = maxWait - timeSinceLastInvoke;     //last invoke 对应 maxWait 而非 wait
        return maxing ?     //只有maxing的时候才取min
            Math.min(timeToNextCall, timeToNextInvoke)
            :
            timeToNextCall;
    }

    const startTimer = (pendingFunc, time) => {
        if (useRAF) {
            globalObj.cancelAnimationFrame(timerId);
            return globalObj.requestAnimationFrame(pendingFunc);
        }
        // console.log({ time })
        return setTimeout(pendingFunc, time);
    }

    const shouldInvoke = time => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        // console.log(maxing, time, lastInvokeTime)
        return lastCallTime === undefined   //通过lastCallTime判断而非timerId
            || timeSinceLastCall >= wait
            || timeSinceLastCall < 0
            || (maxing && timeSinceLastInvoke >= maxWait);
    }

    const invokeFunc = time => {
        const args = lastArgs;
        const thisArgs = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time
        result = func.call(thisArgs, args);
        return result;
    }

    const timerExpired = () => {
        const time = new Date();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = startTimer(timerExpired, remainingWait(time));
    }

    const trailingEdge = time => {
        timerId = undefined;
        // console.log({lastArgs})
        if (trailing && lastArgs) {
            return invokeFunc(time)
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    const leadingEdge = time => {
        lastInvokeTime = time;      //leadingEdge里也要刷新lastInvokeTime而非在trailingEdge里刷新
        // console.log({leading})
        timerId = startTimer(timerExpired, wait);   //debounced里判断过shouldInvoke了，leadingEdge里面不用判断了
        return leading ? invokeFunc(time) : result;
    }

    const cancel = () => {
        if (timerId !== undefined) {
            if (useRAF) { return globalObj.cancelAnimationFrame(timerId); }
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    const flush = () => timerId === undefined ? result : trailingEdge(Date.now());

    const pending = () => timerId !== undefined;

    const debounced = function (...args) {
        const time = new Date();
        const isInvoking = shouldInvoke(time);

        lastCallTime = time;
        lastArgs = args;
        lastThis = this;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(time);
            }
            if (maxing) {
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(time);
            }
        }
        if (timerId === undefined) {
            // console.log({leading})
            timerId = startTimer(timerExpired, wait);
        }
        return result
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
}

export default debounce;