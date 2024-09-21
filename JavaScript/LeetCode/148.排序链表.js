/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// const merge = (array, start, partition, end) => {
const merge = (left, right) => {
    const result = [];
    // console.log('m', {left, right})
    // const leftLength = left.length;
    // const rightLength = right.length;
    // const leftIndex = 0;
    // const rightIndex = 0;
    // for (let index = 0; leftLength && rightLength; index++) {
    //     result[index] = left[leftIndex] < right[rightIndex] ?
    //         left[leftIndex++] : right[rightIndex++];
    for (let index = 0; left.length && right.length; index++) {
        result[index] = left[0] < right[0] ?
            left.shift() : right.shift();
    // for (let index = start; index <= end; index++) {
    //     // if (array[start] > array[partition]) {
    //     result[index] = array[start] < array[partition] ?
    //         array[start++] : array[partition++];
    }
    // console.log('m', {result})
    if (left.length) {
        return result.concat(left);
    }
    return result.concat(right);
}

const mergeSort = (array, start, end) => {
    start = +start;
    end = +end;
    if (!Array.isArray(array)
        || Number.isNaN(start)
        || Number.isNaN(end)
    ) { return array; }

    // console.log({start, end}, [...array].splice(start, 1), [array[start]])
    if (start === end) { return [array[start]]; }
    // if (start === end) { return [...array].splice(start, 1); }
    const partition = Math.floor((start + end) / 2);
    // console.log({partition})
    const left = mergeSort(array, start, partition);
    // console.log({left})
    const right = mergeSort(array, partition + 1, end);
    // console.log({left, right})
    return merge(left, right);
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    // console.log(head?.length)
    if (!head?.length) { return head; }
    return mergeSort(head, 0, head.length - 1);
};
// @lc code=end

let head;
// head = [4,2,1,3];
// head = [-1,5,3,4,0]
// head = []
// head = [1]
// head = [-1,5,3,-2,0]
head = [4,2,1,3]
console.log(sortList(head));