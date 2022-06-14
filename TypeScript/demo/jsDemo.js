/*
 * @Author: NeptLiang
 * @Date: 2022-04-01 19:56:42
 * @LastEditTime: 2022-04-06 18:57:49
 * @LastEditors: Please set LastEditors
 * @Description: TS特性在JS中的情况
 * @FilePath: /demo/jsDemo.js
 */
(() => {
    function makeDate(timestamp) {
        console.log('The first declaration is called');
        return new Date(timestamp);
    }

    function makeDate(y, mIndex, d) {
        console.log('The second declaration is called');
        return new Date(y, mIndex, d);
    }

    //第二个声明覆盖了第一个声明
    console.log(makeDate(1648814577395));   //Invalid Date
    console.log(makeDate(2022, 4, 1));   //2022-04-30T16:00:00.000Z
})()