/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    let [
        run,
        maxRun
    ] = [ 0, 0 ];
    let [
        bought,
        sellMock
    ] = [ prices[0], prices[0] ];
    prices.forEach(price => {
        if (price < bought) {
            maxRun = Math.max(run, maxRun);     //记得取max
            bought = price;
            sellMock = price;
            return;
        }
        // if (price > prevBuy && price < prevSell) {
        // }
        if (price > sellMock) {
            run = price - bought;
            sellMock = price;
        }
    });
    if (run > maxRun) {
        maxRun = run;
    }
    return maxRun;
};

// console.log(maxProfit([4,11,2,7,1]));
// console.log(maxProfit([7,1,5,3,6,4]));
// console.log(maxProfit([7,1,3,4,3,4,1,2,5,3,6,4]));
// console.log(maxProfit([7,6,4,3,1]));
// console.log(maxProfit([1]));
// console.log(maxProfit([1,2]));
// console.log(maxProfit([2,1]));