/*
 * @Author: NeptLiang
 * @Date: 2022-02-15 16:07:16
 * @LastEditTime: 2022-03-04 17:24:46
 * @LastEditors: Please set LastEditors
 * @Description: TypeScript Demo
 * @FilePath: /demo/demo.ts
 */
console.log('Hello! MING');
(function () {
    var Test = function (fn) {
        console.log('parentReturn', fn('parent'));
        console.log('subReturn', fn.sub('sub'));
    };
    var parentFn = function (arg) {
        console.log('parentCalled', arg);
        return arg;
    };
    parentFn.sub = function (arg) {
        console.log('subCalled', arg);
        return arg;
    };
    Test(parentFn);
    var Test2 = function (fn) {
        console.log('parentReturn', fn(0));
        console.log('subReturn', fn.sub(1));
    };
    Test2(parentFn);
})();
(function () {
    // type ObjConstructorType = {
    //     new (a: Number, b: String): { a, b }
    // }
    // const Test3 = (ctor: ObjConstructorType) => {
    //     return new ctor(1, '2')
    // }
    // function FuncObj(a: Number, b: String) {
    //     this.a = a;
    //     this.b = b;
    //     // return { a, b }
    // }
    // // const FuncObj = () => {}
    // // FuncObj.constructor = (a: Number, b: String) => ({ a, b })
    // console.log(new FuncObj(1, '2'))
    // console.log(Test3(FuncObj));
})();
(function () {
    var standaloneMap = function (//使用多个类型参数
    arr, callback) { return arr.map(callback); };
    console.log(standaloneMap(['1', '2', '3'], function (ele) { /* Number. */ return parseInt(ele); }));
    // console.log(Number.parseInt('111eee'))
})();
