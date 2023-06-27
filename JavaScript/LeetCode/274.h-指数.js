/*
 * @lc app=leetcode.cn id=274 lang=javascript
 *
 * [274] H 指数
 *
 * https://leetcode.cn/problems/h-index/description/
 *
 * algorithms
 * Medium (44.40%)
 * Likes:    327
 * Dislikes: 0
 * Total Accepted:    80.2K
 * Total Submissions: 180.5K
 * Testcase Example:  '[3,0,6,1,5]'
 *
 * 给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
 * 
 * 根据维基百科上 h 指数的定义：h 代表“高引用次数” ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且每篇论文 至少 被引用 h
 * 次。如果 h 有多种可能的值，h 指数 是其中最大的那个。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：citations = [3,0,6,1,5]
 * 输出：3 
 * 解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
 * 由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。
 * 
 * 示例 2：
 * 
 * 
 * 输入：citations = [1,3,1]
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == citations.length
 * 1 <= n <= 5000
 * 0 <= citations[i] <= 1000
 * 
 * 
 */

// @lc code=start
/**
 * 计数排序
 * @param {number[]} input 输入的数组
 * @param {object} param1 选项
 * @returns {number[]} 排序后的数组
 */
const countingSort = (input, { descending }) => {
    const len = input.length;
    const map = new Array(len + 1).fill(0);
    const result = new Array(len + 1);
    input.forEach(citation => typeof map[citation] !== 'undefined' ? 
        map[citation]++ 
        : 
        map[citation] = 1
    );
    for (let index = 1, len = map.length; index < len; index++) {
        typeof map[index] !== 'undefined' ? 
            map[index] += map[index - 1]
            :
            map[index] = map[index - 1];
    }
    input.forEach(citation => {
        const index = descending ? 
            len - (map[citation] - 1)
            :
            map[citation];
        result[index] = citation;
        map[citation]--;
    });
    result.shift();
    return result;
}

/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    const sorted = countingSort(citations, {
        descending: true
    });
    // const frequency = sorted.findLastIndex((citation, index) => citation >= index + 1) + 1;     //力扣的 node 版本是 14.8.0，TypeError: sorted.findLastIndex is not a function
    for (let index = sorted.length - 1; index >= 0; index--) {      //力扣的 node 不支持 findLastIndex，只好手动遍历
        if (sorted[index] >= index + 1) {
            return index + 1;
        }
    };
    return 0;
};
// @lc code=end

// let citations;
// // citations = [3,0,6,1,5]
// // citations = [4,0,6,1,5]
// // citations = [2,0,6,1,5]
// // citations = [1,3,1]
// // citations = [2]
// // citations = [1]
// // citations = [0]
// // citations = [1, 1, 1]
// citations = [0, 0, 0]
// console.log(hIndex(citations));