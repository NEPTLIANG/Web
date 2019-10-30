/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
    //第158场力扣周赛——1221. 分割平衡字符串——UnAc
    //Test case: LLLLRRLLRRLLRRRR
    var numOfRequirementR = 0;
    var numOfRequirementL = 0;
    // var isCounting = true;
    // var isMatchingL = false;
    // var isMatchingR = false;
    var matchingChar = s.substring(1);
    var result = 0;
    for (var indexOfChar in s) {
        // if (s[indexOfChar] === "R" && !numOfRequirementR) {
        if (s[indexOfChar] === "R" &&) {
            numOfRequirementL++;
            // isCounting = false;
            // numOfRequirement = 0;
        }
        // if (s[indexOfChar] === "L" && numOfRequirementL) {
        if (s[indexOfChar] === "L" &&) {
            numOfRequirementL--;
            if (!numOfRequirementL) {
                result++;
                // isCounting = false;
            }
        }
        // if (s[indexOfChar] === "L" && !numOfRequirementL) {
        if (s[indexOfChar] === "L" && matchingChar === "L") {
            numOfRequirementR++;
            // isMatchingL = true;
            // numOfRequirementL = 0;
            // isCounting = true;
        }
        // if (s[indexOfChar] === "R" && numOfRequirementR) {
        if (s[indexOfChar] === "R" && matchingChar === "L") {
            numOfRequirementR--;
            if (!numOfRequirementR) {
                result++;
                // isCounting = false;
            }
            // numOfRequirementR = 0;
            // isCounting = true;
        }
    }
};

var s = "LLLLRRLLRRLLRRRR";
balancedStringSplit(s);