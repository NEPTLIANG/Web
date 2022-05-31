/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const arr = [1, 2];
    if (n <= 2) {
        return arr[n - 1];
    }
    for (let step = 3; step <= n; step++) {
        arr.push(arr[0] + arr[1]);
        arr.shift();
    }
    // console.log(arr[1]);
    return arr[1];
};

console.log(climbStairs(4));