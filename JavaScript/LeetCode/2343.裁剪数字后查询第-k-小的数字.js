/*
 * @lc app=leetcode.cn id=2343 lang=javascript
 *
 * [2343] 裁剪数字后查询第 K 小的数字
 */

// @lc code=start
class ElementsWithSatellite {
    origin = 0;
    index = -1;

    constructor(originalValue, index) {
        this.origin = originalValue;
        this.index = index;
    }

    static getNum = element => element?.origin;
    static setNum = (element, num) => {
        if (!element instanceof ElementsWithSatellite) { return; }
        element.origin = num;
    }
}

/**
 * 补零
 * @param {Array} list 列表
 * @param {object} options 选项
 *  - {function} getKey 如果有卫星数据则通过该函数获取关键词
 *  - {function} setKey 修改关键词
 * @returns {object} 填充后的列表与列表项最大长度
 */
const padStrings = (list, {
    getKey,
    setKey,
} = {}) => {
    if (!Array.isArray(list)) { return { list }; }
    const hasSatelliteData = typeof getKey === 'function'
        && typeof setKey === 'function';
    const keys = hasSatelliteData ?
        list.map(element => getKey(element))
        :
        list;
    // const max = keys.reduce((max, current) => {
    //     const maxLength = max.length;
    //     const currentLength = current.length;
    //     if (maxLength !== currentLength) {
    //         return maxLength > currentLength ? max : current;
    //     }
    // })
    // keys.splice(0, 1, -1);      //keys[0] 是 undefined，如果不填上，Math.max 会返回 NaN
    // const max = Math.max(...keys);
    // const maxLen = String(max)?.length;
    const maxLen = keys[1].length;      //所有 nums[i].length 的长度相同，所以不逐个判断了。记得跳过 keys[0]
    return {
        list: hasSatelliteData ? 
            list.map((element, index) => {
                setKey(
                    element,
                    String(keys[index])
                        ?.padStart?.(maxLen, '0')
                );
                return element;
            })
            :
            list.map(string => string.padStart?.(maxLen, '0')),
        maxLen,
    };
};

/**
 * 计数排序
 * @param {Array} array 列表
 * @param {object} param1 选项
 *  - {function} getKey 如果有卫星数据则通过该函数获取关键词
 * @returns {Array} 排序后的数组
 */
const countingSort = (array, {
    getKey
} = {}) => {
    if (!Array.isArray(array)) { return array; }
    const hasSatelliteData = typeof getKey === 'function';
    const count = new Array(array.length + 1).fill(0);
    array.forEach(element => {
        const key = hasSatelliteData ?
            getKey(element) : element;
        return typeof count[key] !== 'undefined' ?
            count[key]++
            :
            count[key] = 1
    });
    for (let index = 1, length = count.length; index <= length; index++) {
        typeof count[index] !== 'undefined' ?
            count[index] += count[index - 1]
            :
            count[index] = count[index - 1];
    }
    const result = [];
    // for (let index = arr.length - 1; index >= 0; index--) {
    array.reduceRight((_, element) => {
        // const element = arr[index];
        const key = hasSatelliteData ? getKey(element) : element;
        result[count[key]--] = element;
    }, 0);
    return result;
}

/**
 * 基数排序
 * @param {Array} array 列表
 * @param {object} options 选项
 *  - {function} getKey 如果有卫星数据则通过该函数获取关键词
 *  - {function} setKey 设置关键词
 *  - {function} getRoundResult 获取每轮按位排序的结果
 * @returns {Array} 排序后的数组
 */
const radixSort = (array, {
    getKey,
    setKey,
    getRoundResult,
}) => {
    const getDigitGetter = index => (
        num => typeof getKey === 'function' && typeof setKey === 'function' ?
            getKey(num)?.[index]
            :
            num[index]
    );
    const {
        list: paddedNums,
        maxLen,
    } = padStrings(array, {
        getKey,
        setKey,
    });
    let sortedNums = paddedNums;
    for (let index = maxLen - 1; index >= 0; index--) {
        const getKey = getDigitGetter(index);
        sortedNums = countingSort(sortedNums, getKey);
        getRoundResult?.(maxLen - 1 - index, sortedNums);
    }
    return sortedNums;
}

/**
 * @param {string[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var smallestTrimmedNumbers = function (nums, queries) {
    let elements = nums.map((element, index) => new ElementsWithSatellite(element, index));
    const getIndex = element => element.index;
    elements = countingSort(elements, getIndex);
    const results = {};
    const getRoundResult = (index, result) => results[index] = result;
    radixSort(elements, {
        getKey: ElementsWithSatellite.getNum,
        setKey: ElementsWithSatellite.setNum,
        getRoundResult,
    });
    return queries.map(([order, length]) => results[length - 1][order].index);
};
// @lc code=end

// let nums, queries;
// // nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]]
// // nums = ["24","37","96","04"], queries = [[2,1],[2,2]]
// nums = ["89288488870527604910029","36097185739782752175822","66626740310751086142991","39210310199276100943112","27763774389382535382104","38417381130871656561097","88045540666254006395713","95788007927435793172832","15831923319620654311625","45043895456202186804606","87291364237858759125697","88163116582250002569968","00507332488046565482379","57170661333341274356658","06401271520738451116188","21731485952024837866860"];
// queries = [[3,17],[10,22],[13,21],[12,16],[1,23],[10,19],[12,21],[10,5],[12,9],[12,10],[9,5],[12,8],[14,6],[5,10],[11,4],[15,15],[13,9],[1,19],[5,12],[10,15],[4,18],[4,3],[16,13],[6,19],[4,18],[2,6],[15,12]];
// // nums = ["24","37","23","04"], queries = [[2,1],[2,2]]
// // nums = ["24","24","23","04"], queries = [[2,1],[2,2]]
// console.log(smallestTrimmedNumbers(nums, queries));