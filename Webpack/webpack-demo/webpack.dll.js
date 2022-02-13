const { resolve } = require('path');
const webpack = require('webpack');

/* 
    使用dll技术，对某些库（第三方库：jQuery、React、Vue……）进行单独打包 
    执行webpack时，默认查找webpack.config.js配置文件
    需求：需要运行webpack.dll.js文件
        webpack --config webpack.dll.js
*/
module.exports = {
    entry: {
        // jquery: 最终打包生成的[name]
        // ['jquery']: 要打包的库是jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]'    //打包的库里向外暴露的内容叫什么名字
    },
    plugins: [
        // 打包生成一个manifest.json，提供对jquery的映射
        new webpack.DllPlugin({
            name: '[name]_[hash]',      //映射库所暴露的内容的名称
            path: resolve(__dirname, 'dll/manifest.json')   //输出文件的路径
        })
    ],
    mode: 'production'
}