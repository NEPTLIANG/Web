console.log([
    '123' == 123,   // true?    true!
    '' == null,    // false?    false!
    '' == 0,        // false?   true!
    [] == 0,        // false?   true!
    [] == '',       // false?   true!
    [] == ![],      // false?   true!
    null == undefined, //  false?   true!
    Number(null),     // 0？    0!
    Number(''),      // 0？     0!
    parseInt(''),    // 0？     NaN!
    { } +10           // TypeError？    '[object Object]10'!
]);

let obj = {

    [Symbol.toPrimitive]() {
        return 200;
    },

    valueOf() {
        return 300;
    },

    toString() {
        return 'Hello';
    }

}

console.log(obj + 200); // 这里打印出来是多少？
