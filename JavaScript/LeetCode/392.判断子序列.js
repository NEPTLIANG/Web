/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    const len = t.length;
    let lastIndex = 0;
    let result = true
    s.split('').forEach(char => {
        let index = t.substring(lastIndex, len).indexOf(char)
        if (index > -1) {
            lastIndex += (index + 1);
            return;
        }
        result = false
    });
    return result;
};
// @lc code=end

// console.log(isSubsequence('abc', 'ahgdcbcdc'));
// console.log(isSubsequence('axc', 'ahgdcbcdc'));
// console.log(isSubsequence('ace', 'abcde'));
// console.log(isSubsequence('aec', 'abcde'));
// console.log(isSubsequence('f', 'abcde'));