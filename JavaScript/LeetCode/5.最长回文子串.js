/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length <= 1) { return s; }
    const map = [];
    let result = '';
    // 边界条件
    for (let index = 0; index < s.length; index++) {
        map[index] = [];
        // 子串长度为1：对称
        map[index][index] = true;
        // 字串长度为2：两字符相同则对称
        if (s[index] === s[index + 1]) {
            map[index][index + 1] = true;
            result = s.slice(index, index + 2);
            continue;
        }
        result = result.length < 2 ? 
            s[index] : result;
    }
    const maxLeft = s.length - 1;
    // 状态迁移
    for (let left = maxLeft; left >= 0; left--) {
        for (let right = left + 2; right < s.length; right++) {
            // substr(left+1, right-1)对称且string[left] === string[right]，则substr(left, right)也对称
            if (
                map[left + 1][right - 1]
                    && s[left] === s[right]
            ) {
                map[left][right] = true;
                result = right - left + 1 > result.length ?
                    s.slice(left, right + 1)
                    :
                    result;
            }
        }
    }
    // console.log(map, result)
    return result;
};

console.log(longestPalindrome('cbbd'));