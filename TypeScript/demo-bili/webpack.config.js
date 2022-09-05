// const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // entry: './src/index.ts',
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'bundle.js',
    //     enviroment: {
    //         arrowFunction: false    //关闭Webpack的箭头函数（可选）
    //     }
    // },
    module: {
        rules: [
            //配置loader
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    // plugins: [
    //     new CleanWebpackPlugin()    //构建前先清空输出目录里的旧文件
    // ],
    devServer: {
        contentBase: './dist'
    },
    // 设置引用模块
    resolve: {
        extensions: ['.ts', '.js']      //配置了之后，imoprt ts、js文件时，路径中的文件名不用后缀
    }
}