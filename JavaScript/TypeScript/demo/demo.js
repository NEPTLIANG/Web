/*
 * @Author: NeptLiang
 * @Date: 2022-02-15 16:07:16
 * @LastEditTime: 2022-03-03 17:20:04
 * @LastEditors: Please set LastEditors
 * @Description: TypeScript Demo
 * @FilePath: /demo/demo.ts
 */
console.log('Hello! MING');
function Test(fn) {
    console.log('parentReturn', fn('parent'));
    console.log('subReturn', fn.sub('sub'));
}
var parentFn = function (arg) {
    console.log('parentCalled', arg);
    return arg;
};
parentFn.sub = function (arg) {
    console.log('subCalled', arg);
    return arg;
};
Test(parentFn);
function Test2(fn) {
    console.log('parentReturn', fn(0));
    console.log('subReturn', fn.sub(1));
}
Test2(parentFn);
