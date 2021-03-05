/*
 * @Author: NeptLiang
 * @Date: 2021-03-04 16:41:31
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-03-04 17:55:07
 * @Description: file content
 */
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|svg|jpg|jepg|gif)$/i,
            type: 'asset/resource'
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource'
        }]
    }
};