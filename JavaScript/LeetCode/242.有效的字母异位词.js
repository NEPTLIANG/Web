/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 *
 * https://leetcode.cn/problems/valid-anagram/description/
 *
 * algorithms
 * Easy (65.82%)
 * Likes:    726
 * Dislikes: 0
 * Total Accepted:    549.2K
 * Total Submissions: 834.5K
 * Testcase Example:  '"anagram"\n"nagaram"'
 *
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 
 * 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: s = "rat", t = "car"
 * 输出: false
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 
 * s 和 t 仅包含小写字母
 * 
 * 
 * 
 * 
 * 进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 * 
 */

// @lc code=start
/**
 * 获取记录单词中字母出现次数的 Hash Map
 * @param {string} word 要遍历的单词
 * @returns {object}
 */
const getMap = word => {
    const map = {};
    for (const char of word) {
        typeof map[char] === 'undefined' ?
            map[char] = 1
            :
            map[char]++;
    }
    return map;
}

/**
 * 判断 mapLeft 是否是 mapRight 的子集
 * @param {object} mapLeft 字符串1对应的 Hash Map
 * @param {object} mapRight 字符串2对应的 Hash Map
 * @returns {boolean}
 */
const isSubSet = (mapLeft, mapRight) => {
    for (const char of Object.keys(mapLeft)) {
        if (mapLeft[char] !== mapRight[char]) { return false; }
    }
    return true;
}

/**
 * 简单判断两个 Hash Map 是否相同
 * @param {object} mapLeft 字符串1对应的 Hash Map
 * @param {object} mapRight 字符串2对应的 Hash Map
 * @returns {boolean}
 */
const isArrEqual = (mapLeft, mapRight) => (
    isSubSet(mapLeft, mapRight) 
        && isSubSet(mapRight, mapLeft)
)

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    const mapS = getMap(s),
        mapT = getMap(t);
    return isArrEqual(mapS, mapT);
};
// @lc code=end

// const s = "", t = "";
// console.log(isAnagram(s, t));