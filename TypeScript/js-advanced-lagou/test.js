// demo\instance_of\instance_of.ts
// import myInstanceOf from "./instance_of.js";
// console.log(myInstanceOf(new Number(123), Number));
// console.log(myInstanceOf(123, Number));

// utils\utils.ts: getType()
// import { getType } from './utils/utils.js';
// console.log([
//     getType([]),
//     getType('123'),
//     // getType(window),
//     getType(global),
//     getType(null),
//     getType(undefined),
//     getType(),
//     getType(function(){}),
//     getType(/123/g),
// ]);

import NumberConversion from './demo/type_conversion_from_Number/type_conversion_from_Number.js';

const results = {
    1:          new NumberConversion(1),
    '-0xffaaa': new NumberConversion('-0xff'),
    '3.14':     new NumberConversion('3.14'),
    '':     new NumberConversion(''),
    'aaa':  new NumberConversion('aaa'),
    '0':    new NumberConversion('0'),
    true:   new NumberConversion(true),
    false:  new NumberConversion(false),
    null:   new NumberConversion(null),
    undefined:  new NumberConversion(undefined),
    Symbol:     new NumberConversion(Symbol()),
};
// results.forEach(obj => console.log(obj.val));
console.log(results);