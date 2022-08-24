/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function (n) {
    // 参考https://leetcode.cn/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/
    const concat = (lor, { str, arr, lNum, rNum }) => {
        if (lor === 'left') {
            str = str.concat('(');
            lNum--;
        } else {
            str = str.concat(')');
            rNum--;
        }
        if (lNum > 0) {
            arr = concat('left', { str, arr, lNum, rNum });
        } 
        if (rNum > 0 && rNum > lNum) {
            arr = concat('right', { str, arr, lNum, rNum });
        }
        if (lNum === 0 && rNum === 0) {
            arr.push(str);
        }
        return arr;
    }
    const arr = concat('left', {
        str: '',
        arr: [],
        lNum: n,
        rNum: n
    })
    // console.log(arr);
    return arr;
};

console.log(generateParenthesis(3));