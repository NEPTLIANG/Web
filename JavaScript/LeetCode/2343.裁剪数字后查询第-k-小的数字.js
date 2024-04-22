/*
 * @lc app=leetcode.cn id=2343 lang=javascript
 *
 * [2343] 裁剪数字后查询第 K 小的数字
 */

// @lc code=start
class ElementsWithSatellite {
    // key = 0;
    origin = 0;
    index = -1;

    constructor(originalValue, index) {
        const value = +originalValue;
        if (Number.isNaN(value)) { throw TypeError('Is not number'); }
        this.origin = value;
        // this.key = typeof getKey === 'function' ?
        //     +getKey(originalValue)
        //     :
        //     value;
        this.index = index;
    }

    static getNum = element => element.origin;
    static setNum = (element, num) => element.origin = num;
}

const padStrings = (list, {
    getKey,
    setKey,
    char = '0'
}) => {
    const hasSatelliteData = typeof getKey === 'function'
        && typeof setKey === 'function';
    const keys = hasSatelliteData ? 
        list.map(element => getKey(element))
        :
        list;
    const max = Math.max(...keys);
    // console.log({max})
    const maxLen = String(max).length;
    // console.log('padding', {getKey, setKey});
    return {
        list: hasSatelliteData ? 
            list.map((element, index) => {
                setKey(element, String(keys[index]).padStart?.(maxLen, char));
                // console.log('padding', String(keys[index]).padStart(0), (char))
                return element;
            })
            :
            list.map(string => string.padStart?.(maxLen, char)),
        maxLen
    };
}

const countingSort = (arr, getKey) => {
    if (!Array.isArray(arr)) { return arr; }
    const hasSatelliteData = typeof getKey === 'function';
    const count = new Array(arr.length + 1).fill(0);
    // console.log({arr})
    arr.forEach(element => {
        // console.log({element})
        const key = hasSatelliteData ? getKey(element) : element;
        return typeof count[key] !== 'undefined' ?
            count[key]++
            :
            count[key] = 1
    });
    // console.log('Range: ', sortMap.length);
    for (let index = 1, length = count.length; index <= length; index++) {
        typeof count[index] !== 'undefined' ?
            count[index] += count[index - 1]
            :
            count[index] = count[index - 1];
    }
    const result = [];
    console.log('===>mapping', count/* -- */)
    arr.forEach(element => {
        const key = hasSatelliteData ? getKey(element) : element;
        // return result[count[key]--] = /* hasSatelliteData ?
        return result[count[key - 1]++] = /* hasSatelliteData ?
            element.satellite
            :  */
            element
        }
    );
    // result.shift();
    return result;
}

const radixSort = (nums, {
    getNum,
    setNum,
    getRoundResult
}) => {
    const getDigitGetter = index => (
        num => {
            // console.log(num)
            return typeof getNum === 'function' && typeof setNum === 'function' ?
                getNum(num)?.[index]
                :
                num[index]
        }
    );
    console.log('round origin', {nums/* , paddedNums */})
    const {
        list: paddedNums,
        maxLen
    } = padStrings(nums, {
        getKey: getNum,
        setKey: setNum
    });
    let sortedNums = paddedNums;
    // console.log({maxLen})
    for (let index = maxLen - 1; index >= 0; index--) {
    // for (let index = 0; index < maxLen; index++) {
        const getKey = getDigitGetter(index);
        // const arr = hasSatelliteData ?
        //     arr.map(element => new ElementsWithSatellite(element, getKey))
        //     :
        //     arr;
        sortedNums = countingSort(sortedNums, getKey);
        console.log('====>round', index, sortedNums);
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
    const results = {};
    const elements = nums.map((element, index) => new ElementsWithSatellite(element, index));
    const getRoundResult = (index, result) => results[index] = result;
    console.log('radix output', radixSort(elements, {
        getNum: ElementsWithSatellite.getNum,
        setNum: ElementsWithSatellite.setNum,
        getRoundResult
    }), results)
    return queries.map((query, index) => {
        console.log('===>query', index, query[1] - 1, results/* .length */[query[1] - 1], query[0] - 1)
        return results[query[1] - 1][query[0] - 1].index
    })
};
// @lc code=end

let nums, queries;
nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]]
// nums = ["24","37","96","04"], queries = [[2,1],[2,2]]
console.log(smallestTrimmedNumbers(nums, queries));
// smallestTrimmedNumbers(["24","37","96","04"]);
// smallestTrimmedNumbers(["24","37","96","04"]);