<?php
include("../EncryAndDecry/SimplifiedRSA.php");  //获取秘钥、加解密函数
//$groupingLen = strlen(decbin($pub["n"])) - 1;  //设加密分组长度为比n的长度小1位

function signature($m, $pri)
{
    $groupingLen = strlen(decbin($pri["p"] * $pri["q"])) - 1;  //设加密分组长度为比n的长度小1位
    $hash = hash("sha256", $m);  //通过SHA256产生64位16进制散列码
//    echo $hash . "\n";
//    echo strlen($hash) . "\n";
    $binHash = "";  //二进制形式的散列码
    for ($i = 0; $i < strlen($hash); $i++) {  //将16进制散列码逐位转为4位2进制形式的字符串
        $binChar = decbin(hexdec($hash[$i]));
        while (strlen($binChar) != 4) {  //若长度不够4位则前补0
            $binChar = "0" . $binChar;
        }
        $binHash = $binHash . $binChar;
    }
//    echo $binHash . "\n";
    $hashLen = strlen($binHash);  //二进制散列码的长度
//    echo $hashLen . "\n";
//echo hexdec("7f");
//echo dechex(15);
//echo pow(2, 20) - 1;
//echo strlen(decbin(64)) . "\n";
//$c = Ek(8000, $pub);
//echo $c . "\n";
//echo strlen(decbin($c)) . "\n";
//echo Dk($c, $pri);
//$groupingLen = 8;
//    echo $groupingLen . "\n";
    while (strlen($binHash) % $groupingLen != 0) {  //若二进制散列码总长度不是分组长度的整数倍，后补0
        $binHash = $binHash . "0";
    }
//    echo $binHash . "\n";
    $groups = [];  //二进制散列码分组
    for ($group = 0; $group * $groupingLen < strlen($binHash); $group++) {  //对二进制散列码进行分组
        $str = substr($binHash, $group * $groupingLen, $groupingLen);
        array_push($groups, $str);
//    echo substr($binHash, $group * $groupingLen, $groupingLen) . ",";
    }
//    var_dump($groups);
//echo strlen($groups[0]);
    $c = "";  //二进制形式的密文
    foreach ($groups as $group) {  //加密二进制散列码分组后将二进制形式的结果分组连接起来作为签名
        $group = bindec($group);
//        echo $group . "\n";
//        function Dk($c, $pri)  //解密
//        {
//            $d = $pri["d"];
//            $n = $pri["p"] * $pri["q"];
//            return squareMultiAlgorithm($c, $d, $n);
//        }
        $d = $pri["d"];
        $n = $pri["p"] * $pri["q"];
        $decGroup = squareMultiAlgorithm($group, $d, $n);
//        $decGroup = Ek($group, $pri);
        $cGroup = decbin($decGroup);  //将二进制形式的散列码分组转为十进制后加密再转回二进制形式
        $cLen = strlen($cGroup);
        while (strlen($cGroup) != $groupingLen + 1) {  //若加密后的分组长度不等于原分组长度，前补0
            $cGroup = "0" . $cGroup;
        }
        while (strlen($cGroup) % 4 != 0) {  //若分组长度不为4的整数倍，前补0
            $cGroup = "0" . $cGroup;
        }
        $c = $c . $cGroup;
//    echo $cGroup ."\n";
//    echo strlen($cGroup) . "\n";
    }
//    var_dump($c);
    $numOfGroup = strlen($c) / 4;
    $hexC = "";  //十六进制形式密文
    for ($i = 0; $i < strlen($c) / 4; $i++) {  //把二进制密文转为十六进制
        $hexC = $hexC . dechex(bindec(substr($c, $i * 4, 4)));
    }
//    var_dump($hexC);
    return $hexC;
}

function verify($hexC, $pub)
{
    $groupingLen = strlen(decbin($pub["n"])) - 1;  //设加密分组长度为比n的长度小1位
    $binDC = "";  //二进制形式密文
    for ($i = 0; $i < strlen($hexC); $i++) {  //把十六进制密文转为二进制
        $binChar = decbin(hexdec($hexC[$i]));
        while (strlen($binChar) != 4) {
            $binChar = "0" . $binChar;  //若长度不为4，前补0
        }
        $binDC = $binDC . $binChar;
    }
//var_dump($binDC);
//echo strlen($binDC) . "\n";
    $groups = [];  //二进制散列值分组
    $dGroupingLen = $groupingLen + (4 - ($groupingLen % 4));  //计算原来补0到4的整数倍后的分组长度
//var_dump($dGroupingLen);
    $dBinHash = "";
    for ($i = 0; $i * $dGroupingLen < strlen($binDC); $i++) {  //对二进制密文分组后转为十进制解密再转回二进制
        $binGroup = substr($binDC, $i * $dGroupingLen, $dGroupingLen);
        $decGroup = bindec($binGroup);
//        function Ek($m, $pub)  //加密
//        {
//            $e = $pub["e"];
//            $n = $pub["n"];
//            return squareMultiAlgorithm($m, $e, $n);
//        }
        $e = $pub["e"];
        $n = $pub["n"];
        $decM = squareMultiAlgorithm($decGroup, $e, $n);
//        $decM = Dk($decGroup, $pub);
//    echo $decM . "\n";
        $group = decbin($decM);
        while (strlen($group) != $groupingLen) {
            $group = "0" . $group;
        }
        $dBinHash = $dBinHash . $group;
        array_push($groups, $group);
//    echo substr($binHash, $group * $groupingLen, $groupingLen) . ",";
    }
//    var_dump($groups);
    $dBinHash = substr($dBinHash, 0, 65 * 4);
    $dHash = "";
    for ($i = 0; $i < 64; $i++) {
        $dHash = $dHash . dechex(bindec(substr($dBinHash, $i * 4, 4)));
    }
//    echo $dHash . "\n";
    return $dHash;
}