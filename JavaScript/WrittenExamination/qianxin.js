/*
 * @Author: NeptLiang
 * @Date: 2020-11-08 17:05:17
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-03-24 10:04:24
 * @Description: 最长上升子序列
 */

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 
 * @param nums int整型一维数组 
 * @return int整型
 */

let getList = (nums, stack, outerIndex) => {
    for (index = outerIndex; index < nums.length; index++) {
        if (nums[index] > stack[stack.length - 1].val) {
            stack.push({
                index: index,
                val: nums[index]
            })
        }
    }
    return stack
}

function lengthOfLIS(nums) {
    // write code here
    let subLists = []
    for (outerIndex in nums) {
        let stack = [{
            index: parseInt(outerIndex),
            val: nums[outerIndex]
        }]
        let subList = getList(nums, stack, outerIndex)
        subLists.push(subList.length)
        for (backIndex = subList.length - 1; backIndex > 0; backIndex--) {
            popIndex = stack[stack.length - 1].index
            stack.pop()
            subLists.push(getList(nums, stack, popIndex + 1).length)
        }
    }
    console.log(subLists)
}
module.exports = {
    lengthOfLIS: lengthOfLIS
};

lengthOfLIS([10, 9, 2, 5, 3, 6, 101, 18])
    // lengthOfLIS([1, 5, 122, 34, 45, 232, 342, 34])