/*
 * @Author: NeptLiang
 * @Date: 2021-06-02 19:44:38
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-11-21 21:50:06
 * @Description: 入口2
 */
import _ from 'lodash';

/* eslint-disable */
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default function print(text) {
  console.log(text);
}

console.log(
  // _.join(['Another', 'module', 'loaded!'], ' '),
);

export const add1s = (sum) => {
  cosole.log('+1s');
  return `剩余${sum++}秒`;
};

export const subtract1s = (sum) => {
  console.log('-1s');
  return `剩余${sum--}秒`;
};
