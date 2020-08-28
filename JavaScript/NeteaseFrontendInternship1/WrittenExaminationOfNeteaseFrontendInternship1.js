/* 网易前端实习笔试第1题，Aced */
/**
 * 接收两个表示9进制数的字符串，返回表示它们相加后的9进制数的字符串
 * @param num1 string字符串 第一个加数
 * @param num2 string字符串 第二个加数
 * @return string字符串
 */
function add(num1, num2) {
    var bit1, bit2, flag = 0, sum, i, result = "";
    if (num1.indexOf(".") !== -1 || num2.indexOf(".") !== -1) {
        if (num1.indexOf(".") == -1) {
            num1 += ".0";
        }
        if (num2.indexOf(".") == -1) {
            num2 += ".0";
        }
        var zheng1 = num1.split(".")[0];
        var zheng2 = num2.split(".")[0];
        var xiao1 = num1.split(".")[1];
        var xiao2 = num2.split(".")[1];
        while (xiao1.length > xiao2.length) {
            xiao2 += "0";
        }
        while (xiao1.length < xiao2.length) {
            xiao1 += "0";
        }
        for (i = xiao1.length - 1; i >= 0; i--) {
            bit1 = parseInt(xiao1[i]);
            bit2 = parseInt(xiao2[i]);
            if (bit1 + bit2 + flag < 9) {
                sum = bit1 + bit2 + flag;
                flag = 0;
            } else {
                sum = (bit1 + bit2 + flag) % 9;
                flag = 1;
            }
            result = sum + result;
        }
        result = "." + result;
    } else {
        zheng1 = num1;
        zheng2 = num2;
    }
    while (zheng1.length > zheng2.length) {
        zheng2 = "0" + zheng2;
    }
    while (zheng1.length < zheng2.length) {
        zheng1 = "0" + zheng1;
    }
    for (i = zheng1.length - 1; i >= 0; i--) {
        bit1 = parseInt(zheng1[i]);
        bit2 = parseInt(zheng2[i]);
        if (bit1 + bit2 + flag < 9) {
            sum = bit1 + bit2 + flag;
            flag = 0;
        } else {
            sum = (bit1 + bit2 + flag) % 9;
            flag = 1;
        }
        result = sum + result;
    }
    return result;
}

console.log(add("25", "15"));

module.exports = {
    add: add
};