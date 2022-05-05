/*
 * @Author: NeptLiang
 * @Date: 2022-04-06 21:33:02
 * @LastEditors: NeptLiang
 * @LastEditTime: 2022-04-11 20:47:23
 * @Description: ES6 Demo
 */

import * as m1 from './export.js';

console.log(m1);
//默认暴露出的内容挂在default属性下
m1.default.teach();