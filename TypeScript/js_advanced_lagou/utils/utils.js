var getType = function (val) {
    var type = typeof val;
    if (type !== 'object') {
        return type;
    } //先进行typeof判断，如果是基础数据类型，直接返回
    // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
    return Object.prototype.toString.call(val).replace(/^\[object (\S+)\]$/, '$1');
};
export { getType };
