/*
 * @Author: NeptLiang
 * @Date: 2022-02-15 16:07:16
 * @LastEditTime: 2022-04-06 18:59:50
 * @LastEditors: Please set LastEditors
 * @Description: TypeScript Demo
 * @FilePath: /demo/demo.ts
 */

console.log('Hello! MING');


(() => {
    type Type<T> = {
        (arg: T): T,    //调用签名，用属性描述函数本身的类型，使用“:”

        sub: (arg: T) => T      //普通方式描述（子）函数类型，使用“=>”
    }

    const Test = (fn: Type<string>): void => {
        console.log('parentReturn', fn('parent'));
        console.log('subReturn', fn.sub('sub'));
    }

    const parentFn = arg => {
        console.log('parentCalled', arg);
        return arg;
    };

    parentFn.sub = arg => {
        console.log('subCalled', arg);
        return arg;
    };

    Test(parentFn);

    const Test2 = (fn: Type<number>): void => {
        console.log('parentReturn', fn(0));
        console.log('subReturn', fn.sub(1));
    }

    Test2(parentFn);
})/* () */;


// (() => {
// type ObjConstructorType = {
//     new (a: Number, b: String): { a, b }
// }

// const Test3 = (ctor: ObjConstructorType) => {
//     return new ctor(1, '2')
// }

// function FuncObj(a: Number, b: String) {
//     this.a = a;
//     this.b = b;
//     // return { a, b }
// }
// // const FuncObj = () => {}
// // FuncObj.constructor = (a: Number, b: String) => ({ a, b })
// console.log(new FuncObj(1, '2'))

// console.log(Test3(FuncObj));
// })();


(() => {
    const standaloneMap = <Input, Output>(      //使用多个类型参数
        arr: Input[],
        callback: (ele: Input) => Output
    ): Output[] => arr.map(callback);

    console.log(standaloneMap<string, number>(
        ['1', '2', '3'],
        ele => /* Number. */parseInt(ele)
    ));
    // console.log(Number.parseInt('111eee'))
})/* () */;

// const optionalParameters = (
//     arr: any[],
//     callback: (
//         ele: any,
//         index?: number
//     ) => void
// ) => {
//     for (let i = 0; i < arr.length; i++) {
//         callback(arr[i], i);    //预期实现：实现函数时传i给callback
//         // callback(arr[i]);   //意外情况：实现函数时可能没传i给callback
//     }
// }

// optionalParameters(
//     [1, 2, 3],
//     // (ele, index) => console.log(ele, index)     //callback为某些情况时正常
//     (ele, index) => console.log(index.toFixed())    //TypeError: Cannot read property 'toFixed' of undefined
// );


// 函数重载
// (() => {
//     // let makeDate = (timestamp: number): Date;   //error TS1005: '=>' expected.
//     // let makeDate = (y: number, m: number, d: number): Date;     //error TS1005: '=>' expected.
//     // let makeDate = (    //无法重新声明块范围变量“makeDate”。ts(2451)
//     function makeDate(timestamp: number): Date;
//     function makeDate(y: number, mIndex: number, d: number): Date;
//     function makeDate(
//         yearOrTimestamp: number,
//         monthIndex?: number,
//         date?: number
//     ): Date {
//         return typeof (monthIndex ?? date) !== 'undefined' ?
//             new Date(yearOrTimestamp, monthIndex, date)
//             :
//             new Date(yearOrTimestamp);
//     }

//     const d1 = makeDate(12345678);
//     const d2 = makeDate(5, 5, 5);
//     // const d3 = makeDate(1, 3);      //error TS2575: No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
//     console.log({ d1, d2 });    // { d1: 1970-01-01T03:25:45.678Z, d2: 1905-06-04T16:00:00.000Z }
// })();


// Pick<Type, Keys>
(() => {
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type TodoPreview = Pick<Todo, 'title' | 'completed'>;

    const preview: TodoPreview = {
        title: 'Clean room',
        // description: 'Description',     // error TS2322: Type '{ title: string; description: string; completed: false; }' is not assignable to type 'Pick<Todo, "title" | "completed">'.
        // completed: 'false'      // error TS2322: Type 'string' is not assignable to type 'boolean'.
        completed: false
    };

    console.log(preview);
})();