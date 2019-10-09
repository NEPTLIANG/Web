/**
 * @param {string} transactions
 * @return {string[]}
 */
var invalidTransactions = function (transactions) {
    eval(transactions);
    var tranArray = [];
    for (var i = 0; i < transactions.length; i++) {
        tranArray.push(Array());
        for (var j = 0; j < 4; j++) {
            var divisionIndex = transactions[i].indexOf(",");
            divisionIndex = divisionIndex > 0 ? divisionIndex : transactions[i].length;
            var subVal = transactions[i].substring(0, divisionIndex);
            transactions[i] = transactions[i].substring(divisionIndex + 1, transactions[i].length);
            tranArray[i].push(subVal);
        }
        tranArray[i].push(tranArray[i][3] > 1000);
    }
};

invalidTransactions("transactions = [\"alice,20,800,mtv\",\"alice,50,100,beijing\"]");