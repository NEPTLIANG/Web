/**
 * @param {string} transactions
 * @return {string[]}
 */
var invalidTransactions = function (transactions) {
    var obj = {};
    var tranArray = [];  //新建一个二维数组来保存从原数组中提取出的信息
    for (var i = 0; i < transactions.length; i++) {  //逐个元素提取信息
        /* var divisionIndex = transactions[i].indexOf(",");  //获取第一个逗号的下标
        // divisionIndex = divisionIndex > 0 ? divisionIndex : transactions[i].length;  //判断indexOf函数是否有找到逗号
        var subVal = transactions[i].substring(0, divisionIndex);  //提取第一个逗号前的内容
        transactions[i] = transactions[i].substring(divisionIndex + 1, transactions[i].length);  //去掉第一个逗号及其之后的内容 */
        obj.name = transactions[i];
        var name = getSubString(obj);
        var time = getSubString(obj);
        var sum = getSubString(obj);
        var city = getSubString(obj);
        var flag = true;
        if (sum > 1000) {
            flag = false;
        }
        tranArray.push(new Tran(name, time, sum, city, flag));
    }
    tranArray.sort(cmp);  //sort函数的参数直接写函数名，不写括号
    var resultArray = [];
    // var resultString = "["
    for (var indexOfElement = 0; indexOfElement < tranArray.length; indexOfElement++) {
        for (var indexOfAnotherElement = indexOfElement + 1; indexOfAnotherElement < tranArray.length; indexOfAnotherElement++) {
            if (tranArray[indexOfElement].city !== tranArray[indexOfAnotherElement].city
                && tranArray[indexOfElement].name === tranArray[indexOfAnotherElement].name
                && Math.abs(tranArray[indexOfElement].time - tranArray[indexOfAnotherElement].time) <= 60) {
                tranArray[indexOfElement].flag = false;
                tranArray[indexOfAnotherElement].flag = false;
            }
        }
        if (tranArray[indexOfElement].flag === false) {
            var resultString = tranArray[indexOfElement].name + ","
                + tranArray[indexOfElement].time + ","
                + tranArray[indexOfElement].sum + ","
                + tranArray[indexOfElement].city;
            resultArray.push(resultString);
        }
    }
    // resultString += "]"
    return resultArray;  //用JS要看模板函数前面的注释说的返回什么类型的值

    // console.log(tranArray);
    /* // eval(transactions);
    var tranArray = [];  //新建一个二维数组来保存从原数组中提取出的信息
    for (var i = 0; i < transactions.length; i++) {  //逐个元素提取信息
        tranArray.push(Array());  //在二维数组中新建一行
        for (var j = 0; j < 4; j++) {  //获取字符串中的信息并插入到二维数组中
            var divisionIndex = transactions[i].indexOf(",");  //获取第一个逗号的下标
            divisionIndex = divisionIndex > 0 ? divisionIndex : transactions[i].length;  //判断indexOf函数是否有找到逗号
            var subVal = transactions[i].substring(0, divisionIndex);  //提取第一个逗号前的内容
            transactions[i] = transactions[i].substring(divisionIndex + 1, transactions[i].length);  //去掉第一个逗号及其之后的内容
            tranArray[i].push(subVal);  //将第一个逗号前的内容插入到二维数组中
        }
        tranArray[i].push(tranArray[i][3] > 1000);  //判断金额是否超过1000并将结果插入数组
    } */
};

function getSubString(obj) {
    var str = obj.name;
    var divisionIndex = str.indexOf(",");  //获取第一个逗号的下标
    divisionIndex = divisionIndex > 0 ? divisionIndex : str.length;  //判断indexOf函数是否有找到逗号
    var subVal = str.substring(0, divisionIndex);  //提取第一个逗号前的内容
    obj.name = str.substring(divisionIndex + 1, str.length);  //去掉第一个逗号及其之后的内容
    return subVal;
}

function Tran(name, time, sum, city, flag) {
    this.name = name;
    this.time = time;
    this.sum = sum;
    this.city = city;
    this.flag = flag;
}

function cmp(a, b) {
    return a.time - b.time;  //sort函数的参数是数值而不是布尔值
}

var transactions;
eval("transactions = [\"alice,20,800,mtv\",\"alice,50,100,beijing\"]");
console.log(invalidTransactions(transactions));