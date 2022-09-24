// import myInstanceOf from "./instance_of.js";

// console.log(myInstanceOf(new Number(123), Number));
// console.log(myInstanceOf(123, Number));

import { getType } from './utils/utils.js';

console.log([
    getType([]),
    getType('123'),
    // getType(window),
    getType(global),
    getType(null),
    getType(undefined),
    getType(),
    getType(function(){}),
    getType(/123/g),
])