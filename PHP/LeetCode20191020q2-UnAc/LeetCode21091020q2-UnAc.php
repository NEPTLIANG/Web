<?php

class Solution
{

    /**
     * @param String[] $folder
     * @return String[]
     */
    function removeSubfolders($folder)  //第159场力扣周赛第2题——1233. 删除子文件夹——UnAc
    {
//        eval($folder);  //注意参数是字符串数组而不是字符串啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊傻逼
        for ($indexOfItem = 0; $indexOfItem < sizeof($folder); $indexOfItem++) {  //sizeof返回数组长度
            for ($indexOfAnotherItem = $indexOfItem + 1; $indexOfAnotherItem < sizeof($folder); $indexOfAnotherItem++) {
                $p = '/' . preg_quote($folder[$indexOfItem], '/') . '/';  //preg_quote转义字符
//                echo $p . " " . $folder[$indexOfAnotherItem] . "\n";
//                var_dump(preg_match($p, $folder[$indexOfAnotherItem]));
                if (preg_match($p, $folder[$indexOfAnotherItem]) == true) {
//                    $folder
                }
            }
        }
    }
}

$folder = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"];
$a = new Solution();
$a->removeSubfolders($folder);