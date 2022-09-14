var myInstanceOf = function (val, type) {
    // 首先排除基础数据类型，及typeof返回'object'的null
    if (typeof val !== 'object' || val === null) {
        return false;
    }
    var proto = Object.getPrototypeOf(val);
    while (proto !== null) {
        if (proto === (type === null || type === void 0 ? void 0 : type.prototype)) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};
export default myInstanceOf;
