/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    const map = {};
    nums.forEach(num => {
        if (!map[num]) {
            map[num] = 0;
        }
        map[num]++;
    })
    const threshold = nums.length / 2;
    return Object.keys(map).filter((item) => map[item] > threshold);
};
// @lc code=end

const nums = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums));