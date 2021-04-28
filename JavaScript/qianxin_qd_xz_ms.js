/*
 * @Author: NeptLiang
 * @Date: 2021-04-28 11:02:15
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-04-28 11:02:16
 * @Description: file content
 */
/**
 * sort the array
 * @param arr int整型一维数组 the array
 * @return int整型一维数组
 */
function sort(arr) {
    let len = arr.len;
    for (let i = 0; i < len; i++) {
        for (let j = i; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr;
}
module.exports = {
    sort: sort
};