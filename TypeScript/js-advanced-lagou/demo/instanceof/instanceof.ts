interface Type { prototype: unknown }

const myInstanceOf = (val: unknown, type: Type): boolean => {
    if (typeof val !== 'object' || val === null) { return false; }      //首先排除基础数据类型，及typeof返回'object'的null
    let proto = Object.getPrototypeOf(val);     //获取参数的原型对象
    while (proto !== null) {    //循环遍历原型链寻找直到找到原型对象或到达原型链尽头
        if (proto === type?.prototype) { return true; }     //找到对应的原型对象，返回true
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};

export default myInstanceOf;