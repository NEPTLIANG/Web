import getCounter from "./getCounter.js";

const counter1 = getCounter();
const counter2 = getCounter();

counter1.increment();
counter1.increment();
counter1.increment();

counter2.increment();
counter2.increment();
console.log(counter1.getVal(), counter2.getVal());

counter1.decrement();
console.log(counter1.getVal());      // 2

console.log(counter1._val);      // undefined
counter1._val = 100;
console.log(counter1.getVal());      // 2
// counter1.changeBy(100);      // TypeError: counter.changeBy is not a function