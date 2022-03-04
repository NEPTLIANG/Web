/*
 * @Author: NeptLiang
 * @Date: 2022-02-15 16:07:16
 * @LastEditTime: 2022-03-04 17:24:46
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
})();


(() => {
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
})();


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
})();