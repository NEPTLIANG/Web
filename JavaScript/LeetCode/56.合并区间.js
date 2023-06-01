/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 *
 * https://leetcode.cn/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (49.27%)
 * Likes:    1862
 * Dislikes: 0
 * Total Accepted:    617.3K
 * Total Submissions: 1.3M
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
 * 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^4
 * 
 * 
 */

// @lc code=start
const START = 0;
const END = 1;

/**
 * 判断往左还是往右插
 * @param {<Item>} item 遍历到的数组元素
 * @param {<Item>} anchor 被选作锚点的数组元素
 * @returns {boolean} true: 左; false: 右
 */
const judgeQuickSortItem = (item, anchor) => {
    if (item[START] === anchor[START]) {
        return item[END] > anchor[END];
    }
    return item[START] < anchor[START];
}

/**
 * 快排
 * @param {<Item>[]} arr 要排序的数组
 * @param {Function} judge 判断往左还是往右插的函数
 * @returns {<Item>[]} 排序后的数组
 */
const quickSort = (arr, judge) => {
    const len = arr.length;
    if (len <= 1) { return arr; }
    let left = [];
    let right = [];
    const anchor = arr[0];
    for (let index = 1; index < len; index++) {
        const item = arr[index];
        judge(item, anchor) ?
            left.push(item)
            :
            right.push(item);
    }
    left = quickSort(left, judge);
    right = quickSort(right, judge);
    return left.concat([anchor], right);
}

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    let len = intervals.length;
    if (len <= 1) { return intervals; }
    const sortedIntervals = quickSort(intervals, judgeQuickSortItem);
    let index = 0;
    while (index < len - 1) {
        const left = sortedIntervals[index];
        const right = sortedIntervals[index + 1];
        /* 看了题解才知道其实直接判断 left[END] >= right[START] 
            若真则取 [ left[START], Max(left[END], right[END]) ] 就行，
            （就相当于把下面的 left[END] >= right[START] 提到外层 if）
            （而且这样还不用在排序时对起点相同的情况作特殊处理）
        */
        if (/* left[START] === right[START] && */ left[END] >= right[END]) {
            // (/* left[START] < right[START] && */ left[END] >= right[END])
            // (left[END] === right[START] && left[END] === right[END])
            // (left[START] === right[START] && left[END] === right[END])
            sortedIntervals.splice(index, 2, left);
            len--;
            continue;
        }
        if (left[END] >= right[START] && left[END] <= right[END]) {
            // || left[END] === right[START]
            sortedIntervals.splice(index, 2, [left[START], right[END]]);
            len--;
            continue;
        }
        // if (left[START] === right[START] && left[END] === right[START]) {
        index++;
    }
    return sortedIntervals;
};
// @lc code=end

// let intervals;
// // intervals = [[1,3],[2,6],[8,10],[15,18]]
// // intervals = [[3,7],[1,3],[2,6],[15,18],[9,14],[8,10],[8,12],[13,14],[13,14]]
// // intervals = [[1,4],[4,5]]
// intervals = [[1,4]]
// console.log(merge(intervals));