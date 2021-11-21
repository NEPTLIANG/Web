// 假设，某个 library 创建出一个全局变量，
// 它期望 consumer(使用者) 使用这个变量
// 可以使用 exports-loader，
// 将一个全局变量作为一个普通的模块来导出
/* eslint-disable */
var file = 'blah.txt';
var helpers = {
    test: function () { console.log('test something'); },
    parse: function () { console.log('parse something'); }
};