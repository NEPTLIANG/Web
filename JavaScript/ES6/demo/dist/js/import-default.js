/*
 * @Author: NeptLiang
 * @Date: 2022-04-11 20:46:25
 * @LastEditors: NeptLiang
 * @LastEditTime: 2022-04-11 20:53:01
 * @Description: file content
 */

// import { default } from './export.js'      //SyntaxError: Unexpected reserved word，不能直接import { default }
import { default as m1 } from './export.js'; //给default起个别名后可以import

console.log(m1); // { school: 'LNU', teach: [Function: teach] }