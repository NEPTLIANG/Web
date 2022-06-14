/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const ans = [];
    for (let i=0; i<=n; i++) {
        ans.push([...i.toString(2).matchAll(/1/g)].length);
    }
    return ans;
};
// @lc code=end

// console.log(countBits(5));