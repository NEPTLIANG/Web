/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
    //第155场力扣周赛第1题——1200. 最小绝对差——UnAc
    arr.sort(cmp);
    var coupleArray = [];
    for (var row = 0; row < arr.length; row++) {
        for (var col = row; col < arr.length; col++) {
            var newCouple = new Couple(arr[row], arr[col]);
            coupleArray.push(newCouple);
        }
    }
    coupleArray.sort(cmpByDiff);
    var resultArray = [];
    var couple = new Array(coupleArray[0].left, coupleArray[0].right);
    resultArray.push(couple);
    for (var indexOfCouple = 1; coupleArray[indexOfCouple].different === coupleArray[indexOfCouple - 1].different; indexOfCouple++) {
        var couple = new Array(coupleArray[indexOfCouple].left, coupleArray[indexOfCouple].right);
        resultArray.push(couple);
    }
    console.log(resultArray);
};

function Couple(left, right) {
    this.left = left;
    this.right = right;
    this.different = right - left;
}

function cmp(left, right) {  //升序排序
    return left - right;
}

function cmpByDiff(couple1, couple2) {  //对元素对按照差的升序排序
    return couple1.different - couple2.different;
}

var arr = [4, 2, 1, 3];
minimumAbsDifference(arr);