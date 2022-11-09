import withinErrorMargin from "./src/withinErrorMargin.js"

console.log(withinErrorMargin(
    0.1 + 0.2, 
    0.3
    // 0.3 + 2 * Number.EPSILON 
    // 0.30000000000000000000000000000000001
));