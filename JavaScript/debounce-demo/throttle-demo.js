import debounce from "./debounce-demo.js";

const throttle = (func, wait, options) => {
    const {
        leading,
        trailing
    } = options || {};

    return debounce(func, wait, {
        leading,
        trailing,
        maxWait: wait
    });
}

export default throttle;