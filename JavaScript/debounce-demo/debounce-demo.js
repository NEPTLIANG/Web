const isObject = arg => Object.prototype.toString.call(arg) === '[object Object]';

const globalObj = window || global || globalThis || (function () {
    return this;
})() || (new Function('return this'))();

const debounce = (func, wait, options) => {
    console.log(Object.prototype.toString.call(null))
    let {
        leading,
        trailing,
        maxWait
    } = isObject(options) ? options : {};
    let result,
        timerId,
        lastThis,
        lastArgs;
    let lastCallTime = 0;
    let lastInvokeTime = 0;
    const useRAF = +wait <= 0
        && typeof globalObj.requestAnimationFrame === 'function';
    const maxing = typeof maxWait === 'number';

    if (typeof func !== 'function') { throw new Error(); }
    wait = maxing ? Math.min(+wait, +maxWait) : (+wait || 0);
    leading = !!leading;
    trailing = !(trailing === false);
    // console.log({leading})


    const remainingWait = time => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        console.log({ wait })
        const timeToNextCall = wait - timeSinceLastCall;
        const timeToNextInvoke = wait - timeSinceLastInvoke;
        return Math.min(timeToNextCall, timeToNextInvoke);
    }

    const startTimer = (pendingFunc, time) => {
        if (useRAF) {
            cancelAnimationFrame(timerId);
            return requestAnimationFrame(pendingFunc);
        }
        console.log({ time })
        return setTimeout(pendingFunc, time);
    }

    const shouldInvoke = time => {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        // console.log(maxing, time, lastInvokeTime)
        return timerId === undefined
            || timeSinceLastCall < 0
            || timeSinceLastCall >= wait
            || (maxing && timeSinceLastInvoke >= maxWait);
    }

    const invokeFunc = time => {
        // console.log({leading})
        const args = lastArgs;
        const thisArgs = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time
        result = func.call(thisArgs, args);
        return result;
    }

    const timerExpiration = () => {
        const time = new Date().valueOf();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = startTimer(timerExpiration, remainingWait(time));
    }

    const trailingEdge = time => {
        timerId = undefined;
        // console.log({lastArgs})
        if (trailing && lastArgs) {
            return invokeFunc(time)
        }
        lastInvokeTime = time;
        lastArgs = lastThis = undefined;
        return result;
    }

    const leadingEdge = time => {
        if (shouldInvoke(time)) {
            // console.log({leading})
            timerId = startTimer(timerExpiration, wait);
            return leading ? invokeFunc(time) : result;
        }
        return result;
    }

    const cancel = () => {
        if (useRAF) { return cancelAnimationFrame(timerId); }
        clearTimeout(timerId);
        timerId = undefined;
    }

    const flush = () => {
        invokeFunc(new Date().valueOf())
        if (useRAF) { return cancelAnimationFrame(timerId); }
        clearTimeout(timerId);
    }

    const pending = () => typeof timerId !== 'undefined';

    const debounced = function (...args) {
        const time = new Date().valueOf();
        const isInvoking = shouldInvoke(time);
        lastCallTime = time;
        lastArgs = args;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(time);
            }
            if (maxing) {
                return leading ? invokeFunc(time) : result;
            }
        }
        if (timerId === undefined) {
            // console.log({leading})
            leading ? invokeFunc(time) : result;
        }
        return result
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
}

export default debounce;