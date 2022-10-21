/**
 * MDN Demo: 闭包模拟私有实例属性——https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures#%E7%94%A8%E9%97%AD%E5%8C%85%E6%A8%A1%E6%8B%9F%E7%A7%81%E6%9C%89%E6%96%B9%E6%B3%95
 * @returns { increment, decrement, getVal }
 */
function getCounter() {
    // 私有属性
    let _val = 0;

    // 私有方法
    function changeBy(val) {
        _val += val;
    }

    function increment() { changeBy(1); }
    function decrement() { changeBy(-1); }
    function getVal() { return _val; }

    return {
        increment,
        decrement,
        getVal
    }
}

export default getCounter;