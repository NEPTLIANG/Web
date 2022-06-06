/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.nums = nums
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    let sum = 0;
    this.nums.slice(left, right + 1).forEach(num => sum += num);
    // console.log(sum);
    return sum;
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end

// const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
// numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
// numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
// numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
// numArray.sumRange(0, 0); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
// numArray.sumRange(0, 1); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
// numArray.sumRange(0, 1); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
// numArray.sumRange(0, 6); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))