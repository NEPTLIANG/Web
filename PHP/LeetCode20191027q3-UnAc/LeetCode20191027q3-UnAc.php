<?php

class Solution
{

    /**
     * @param String[] $arr
     * @return Integer
     */
    function maxLength($arr)  //第160场力扣周赛第3题——1239. 串联字符串的最大长度——UnAc
    {
        $charTable = [];
        for ($line = 0; $line < 26; $line++) {
            $charTable[$line] = [];
        }
        for ($indexOfStr = 0; $indexOfStr < count($arr); $indexOfStr++) {  //count函数计算数组长度
//            echo $arr[$indexOfStr] . "\n";  //PHP debug extension is not installed,只好echo调试
//            var_dump(explode($str,""));
            /*foreach (explode($str, "") as $ch) {
                echo (int)$ch . "\n";
            }*/
            for ($indexOfChar = 0; $indexOfChar < strlen($arr[$indexOfStr]); $indexOfChar++) {  //strlen函数计算字符串长度
                $ascii = ord($arr[$indexOfStr][$indexOfChar]) - ord('a');  //ord函数将字符转为ASCII码
//                echo $indexOfStr . " " . $ascii . "\n";
                array_push($charTable[$ascii], $indexOfStr);  //array_push函数在数组后面插入元素
            }
        }
//        var_dump($charTable);
    }
}

$solution = new Solution();
$solution->maxLength(["un", "iq", "ue"]);