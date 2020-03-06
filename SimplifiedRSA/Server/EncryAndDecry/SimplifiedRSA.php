<?php
function millerRabinAlgorithm($n)  //按照课本介绍实现的Miller-Rabin算法，素性检测，有BUG，弃用之
{
    $d = 1;
    $nSubOne = decbin($n - 1);
    $a = mt_rand(0, $n - 1);for ($i = 0; $i < strlen($nSubOne); $i++) {
        $x = $d;
        $d = pow($d, 2) % $n;
        if ($d == 1 && $x != 1 && $x != $n - 1) {
            return true;  //n不是素数
        }
        if ($nSubOne[$i] == "1") {
            $d = ($a * $d) % $n;
        }
        if ($d != 1) {
            return true;  //n不是素数
        }
        return false;  //n有可能是素数
    }
    return -1;
}

function millerRabinAlgorithmV2($n)  //参照William Stallings所著的《密码编码学与网络安全——原理与实践（第七版）》实现的Miller-Rabin算法，素性检测
{
    $k = 1;
    $q = ($n - 1) / 2;
    while (pow(2, $k) < $n - 1) {  //找 n-1 = 2^k *q 中的k和q
        $q = ($n - 1) / 2;
        while (pow(2, $k) * $q < $n - 1) {
            if (pow(2, $k) * $q == $n - 1) {
                break;
            }
            $q -= 2;
        }
        if (pow(2, $k) * $q == $n - 1) {
            break;
        }
        $k++;
    }
    $flags = [];
    while (true) {
        $flags = [];
        for ($times = 0; $times < 10; $times++) {
            $flag = false;
            $a = mt_rand(2, $n - 2);
//            if (pow($a, $q) % $n == 1) {  //溢出了，应用平方乘算法
            if (squareMultiAlgorithm($a, $q, $n) == 1) {
                $flag = true;  //有可能是素数
            }
            for ($j = 0; $j < $k; $j++) {
                $exponent = pow(2, $j) * $q;
//                if (pow($a, $exponent) % $n == $n - 1) {
                if (squareMultiAlgorithm($a, $exponent, $n) == $n - 1) {
                    $flag = true;  //有可能是素数
                }
            }
            array_push($flags, $flag);  //不是素数
        }
        $isTrue = true;
        foreach ($flags as $flag) {
            if ($flag != $flags[0]) {
                $isTrue = false;
                break;
            }
        }
        if ($isTrue) {
            break;
        }
    }
    return $flags[0];
}

function getBigPrimeNum()  //按照课本的方法实现的选取“大”素数（32到48位）
{
    $n = 0;
    while (!($n % 2)) {
        $n = mt_rand((int)pow(2, 32), (int)pow(2, 48));
    }
//    for ($i = 0; $i < 2; $i++) {
    while (!millerRabinAlgorithmV2($n)) {
        $n *= 2;
        while (!($n % 2)) {
            $n = mt_rand((int)pow(2, 8), (int)pow(2, 12));
        }
        $i = 0;
    }
//    }
    return $n;
}

function getSmallPrimeNum()  //用另一种方式生成小素数，未完成，弃用
{
    $bottom = pow(2, 8);
    $top = pow(2, 16);
//    $nums = range($bottom, $top);
    $nums = [];
    for ($i = $bottom; $i <= $top; $i++) {
        array_push($nums, $i);
    }
    $primeNums = [];
    for ($num = $bottom; $num < $top; $num++) {
        for ($i = 0; $i * $num <= $top; $i++) {
            unset($nums[$i * $num + $bottom]);
        }
    }
//    var_dump($nums);
    foreach ($nums as $num) {
        array_push($primeNums, $num);
    }
}

function gcd($e, $fai)  //辗转相除法，求最大公约数
{
    while (($fai % $e) != 0) {
        $faiOld = $fai;
        $fai = $e;
        $e = $faiOld % $e;
    }
    return $e;  //返回e而不是fai
//    if ($b == 0) {
//        return $a;
//    } else {
//        return gcd($b, $a % $b);
//    }
}

function squareMultiAlgorithm($m, $e, $n)  //“平方-乘”算法，求 M^e mod n
{
    $e = decbin($e);
    $d = 1;
    for ($i = 0; $i < strlen($e); $i++) {  //注意是从左到右遍历e的二进制形式，不是从右到左
        $d = pow($d, 2) % $n;
//        echo $d."\n";
        if ($e[$i] == 1) {
            $d = ($d * $m) % $n;
        }
    }
    return $d;
}

function Ek($m, $pub)  //加密
{
    $e = $pub["e"];
    $n = $pub["n"];
//    echo $e;
//    echo pow($m, $e);
//    return pow($m, $e) % $n;
    return squareMultiAlgorithm($m, $e, $n);
}

function Dk($c, $pri)  //解密
{
    $d = $pri["d"];
    $n = $pri["p"] * $pri["q"];
//    echo pow($c, $d);
//    return pow($c, $d) % $n;
    return squareMultiAlgorithm($c, $d, $n);
}

//phpinfo();
//var_dump((int)pow(2, 62));
//var_dump((int)pow(10, 30));
$p = getBigPrimeNum();
$q = getBigPrimeNum();
//$p = 9187;
//$q = 10733;
$n = $p * $q;
$fai = ($p - 1) * ($q - 1);

//$fai = 144;

$e = mt_rand(2, $fai);
while (gcd($e, $fai) != 1) {  //选择e使得gcd(e, fai)=1 （即e与fai互素）
    $e = mt_rand(2, $fai);
}

//$e = 7;

$d = 2;
//while (((($d % $fai) * ($e % $fai)) % $fai) != 1) {
while ((($d * $e) % $fai) != 1 && $d < $fai) {  //计算d使得de与 1 mod fai 同余
    $d++;
}

//for ($k = 0, $d = 0; $d < $fai; $k++) {  //计算d使得de与 1 mod fai 同余
//    $d = ($k * $fai + 1) / $e;
//    echo $fai . "\n" /*. $e . "\n"*/ . $d . "\n";
//    if (floor($d) == $d) {
//        break;
//    }
//}

//$k = ["n" => $n,
//    "p" => $p,
//    "q" => $q,
//    "d" => $d,
//    "e" => $e];
$pub = ["e" => $e, "n" => $n];  //公钥
$pri = ["p" => $p, "q" => $q, "d" => $d];  //私钥

//$c = Ek(115, $pub);
//var_dump($c);
//echo Dk($c, $pri);

//加密
//$em = $_POST["em"];
//if ($em > 110) {
//    echo "<script>alert(/数值过大，暂时只支持2~110/);</script>";
//    exit(1);
//}
//if ($em != "") {
//    $c = Ek($em, $pub);
//    echo "<p>公钥{e,n}：</p>"
//        . "<p id=\"epub\">{" . $pub["e"] . "," . $pub["n"] . "}</p>"
//        . "<p>私钥{p,q,d}：</p>"
//        . "<p id=\"epri\">{" . $pri["p"] . "," . $pri["q"] . "," . $pri["d"] . "}</p>"
//        . "<p>密文：</p>"
//        . "<p id=\"ec\">" . $c . "</p>";
//}

////解密
///*Test case:
//公钥{e,n}：{43,119}
//私钥{p,q,d}：//{7,17,67}
//密文：106*/
//$dpri = $_POST["dpri"];
//
////$dpri = "{7,17,67}";
//
//if ($dpri != "") {
//    $dc = $_POST["dc"];
//
////    $dc = 106;
//
//    $dpri = substr($dpri, 1, strlen($dpri) - 2);  //取子串：substr($原串, $start, $length)
//    $dpri = explode(",", $dpri . substr(2, strlen($dc) - 1));  //分割字符串： $数组=explode($分割字符, $字符串)
//    $pri = ["p" => (int)$dpri[0], "q" => (int)$dpri[1], "d" => (int)$dpri[2]];
//    $dm = Dk($dc, $pri);
////    var_dump($dm);
//    echo "<p>明文：</p>"
//        . "<p id=\"dm\">" . $dm . "</p>";
//}

//var_dump(millerRabinAlgorithmV2(29));
//getSmallPrimeNum();