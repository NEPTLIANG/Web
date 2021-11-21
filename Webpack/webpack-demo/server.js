/*
 * @Author: NeptLiang
 * @Date: 2021-09-05 18:57:02
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-09-05 19:02:15
 * @Description: file content
 */
/* 
    服务器代码
    启动服务器指令：
        npm i nodemon -g
        nodemon server.js

        node server.js
    访问服务器地址：
        http://localhost:3000
*/
const express = require('express');

const app = express();
app.use(express.static('build', { maxAge: 1000 * 3600 }));
app.listen(3000);