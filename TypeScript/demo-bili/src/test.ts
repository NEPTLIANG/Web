interface Inter {
    length: number;
}

// <T extends Inter> 表示泛型T必须是接口Inter的实现类（子类）
function fn<T extends Inter>(p: T): number {
    return p.length;
}

// fn(1111);   // error TS2345: Argument of type 'number' is not assignable to parameter of type 'Inter'.
console.log(fn('1111'));    // 4
console.log(fn([1, 2, 3, 4, 5]));


// (function b(this: object, para1: number) {
//     console.log(this, para1);
// }).call(globalThis, 1);

// class C {
//     constructor() {
//         this.b/* .call */(/* 'c', */ 1);
//     }
//     b(/* this: string, */ para1: number) {
//         console.log(this, para1);
//     }
// }
// let c = new C();
// ((n: null) => console.log(n))(/* undefined */ null);