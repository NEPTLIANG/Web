/**
 * 桶排序
 * @param {number[]} a 输入的数组
 * @returns {number[]} 排序后的数组
 */
const bucketSort = a => {
    const n = a.length;
    const b = new Array(n).fill().map(() => []);
    a.forEach(aItem => {
        b[Math.floor(n * aItem)].push(aItem);
    });
    b.forEach((bItem, i) => b[i] = bItem.sort());   //ToDo: 换成书上的插入排序
    return b.reduce((prev, bItem) => prev.concat(bItem));
};

export default bucketSort;