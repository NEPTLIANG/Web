/*
 * @Author: NeptLiang
 * @Date: 2021-05-09 10:19:18
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-05-09 13:40:26
 * @Description: Wrong Answer(用例正确率：37%)
 */

/**
 * 获取能搬过家具的木桩位置
 * @param {Number} n 栅栏共有n个木桩
 * @param {Number} m 家具宽度（需要跨过m个木桩）
 * @param {Number} h 能跨过的最高木桩高度h
 * @param {Array} list 各个木桩的高度
 * @returns index / -1
 */
let getIndex = (n, m, h, list) => {
    // console.log(list)
    let lens = [];
    for (let index = 0, len = list.length; index < len; index++) {
        lens[index] = 0;
        if (list[index] <= h) {
            lens[index] = typeof(lens[index - 1]) !== 'undefined' ?
                lens[index - 1] + 1 :
                1;
        }
        // console.log(lens[index])
        if (lens[index] >= m) {
            return (index - (m - 1) + 1);
        }
    }
    return -1;
};

let [n, m, h] = [5, 3, 2];
let list = [3, 2, 1, 1, 2];
console.log(getIndex(n, m, h, list));