/**
 * Number.EPSILON Demo: 阮一峰《ECMAScript 6 入门》忽略浮点误差检查函数
 * 参考：https://es6.ruanyifeng.com/#docs/number#Number-EPSILON
 * @param {number} left 值1
 * @param {number} right 值2
 * @param {number} precision 二进制精度指数。例如值为50时，精度约为2^-50
 * @returns {boolean} 是否视为相等
 */
function withinErrorMargin (left, right, precision = 52) {
    const diff = Math.abs(left - right);
    const carry = 2 ** (52 - precision);
    // console.log({diff, ep: Number.EPSILON})
    return diff <= Number.EPSILON * carry;
}

export default withinErrorMargin;
