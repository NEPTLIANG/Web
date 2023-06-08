/**
 * 计数排序
 * @param {number[]} a 输入的数组
 * @param {number[]} b 排序的输出
 * @param {number} k 输入元素的范围（输入元素中的每一个都是在 0 到 k 区间内的一个整数）
 * @returns {number[]} 排序后的数组
 */
export const countingSort = (a, b, k) => {
    let c = new Array(k + 1).fill(0);
    for (let i = 0; i < a.length; i++) {
        // c[a[i]]: a中各个元素a[i]出现的次数
        c[a[i]] = c[a[i]] + 1;      
    }
    for (let i = 1; i <= k; i++) {
        // 将c改写为小于等于各个元素i的元素出现的次数（原c[i]）之和
        c[i] = c[i] + c[i - 1];     
    }
    for (let j = a.length - 1; j >= 0; j--) {
        // 因为小于等于a[j]的元素次数共有c[a[j]]个，故直接把元素a[j]放到输出数组的对应位置b[c[a[j]]]里
        b[c[a[j]]] = a[j];    
        // “指针前移”，以便处理元素a[j]相同时的“哈希冲突”
        c[a[j]] = c[a[j]] - 1;
    }
    b.shift();
    return b;
}