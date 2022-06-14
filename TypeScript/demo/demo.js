/*
 * @Author: NeptLiang
 * @Date: 2022-02-15 16:07:16
 * @LastEditTime: 2022-04-06 18:45:46
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
}) /* () */;
// (() => {
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
// })();
(function () {
    var standaloneMap = function (//使用多个类型参数
    arr, callback) { return arr.map(callback); };
    console.log(standaloneMap(['1', '2', '3'], function (ele) { /* Number. */ return parseInt(ele); }));
    // console.log(Number.parseInt('111eee'))
}) /* () */;
function makeDate(yearOrTimestamp, month, date) {
    return typeof (month !== null && month !== void 0 ? month : date) !== 'undefined' ?
        new Date(yearOrTimestamp, month, date)
        :
            new Date(yearOrTimestamp);
}
var d1 = makeDate(12345678);
var d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);      //error TS2575: No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
console.log({ d1: d1, d2: d2 }); // { d1: 1970-01-01T03:25:45.678Z, d2: 1905-06-04T16:00:00.000Z }
