/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
    var text2 = text;
    var targetStr = "balloon";
    var result = text2.split(targetStr.charAt(0)).length - 1;
    for (var indexOfTargetLetter = 1; indexOfTargetLetter < targetStr.length; indexOfTargetLetter++) {
        // text2 = text;
        var thisLetter = targetStr.charAt(indexOfTargetLetter);
        var thisLetterSum = text2.split(thisLetter).length - 1;
        if (thisLetter == 'l' || thisLetter == 'o') {
            thisLetterSum = Math.floor(thisLetterSum / 2);
        }
        if (thisLetterSum < result) {
            result = thisLetterSum;
        }
        /*for (var i = 0; i < text.length; i++) {
            if (targetStr.charAt(indexOfTargetLetter) == text.charAt(i)) {

            }
                }*/
    }
    return result;
}

console.log(maxNumberOfBalloons("leetcode"));