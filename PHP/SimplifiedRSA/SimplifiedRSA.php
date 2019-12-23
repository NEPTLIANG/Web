<?php
function millerRabinAlgorithm($n, $a)  //Miller-Rabin算法，素性检测
{
    $d = 1;
    $nSubOne = decbin($n - 1);
    for ($i = strlen($nSubOne) - 1; $i >= 0; $i++) {
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

function getBigPrimeNum()  //选取“大”素数（8到12位）
{
    $n = 0;
    while (!($n % 2)) {
        $n = mt_rand((int)pow(2, 8), (int)pow(2, 12));
    }
    $a = mt_rand(0, $n - 1);
    for ($i = 0; $i == 1024; $i++) {
        if (millerRabinAlgorithm($n, $a)) {
            $i = 0;
        }
    }
    return $n;
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
    for ($i = strlen($e) - 1; $i >= 0; $i--) {
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
$n = $p * $q;
$fai = ($p - 1) * ($q - 1);

$e = mt_rand(2, $fai);
while (gcd($fai, $e) != 1) {  //选择e使得gcd(e, fai)=1 （即e与fai互素）
    $e = mt_rand(2, $fai);
}

$d = 2;
//while (((($d % $fai) * ($e % $fai)) % $fai) != 1) {
while ((($d * $e) % $fai) != 1) {  //计算d使得de与 1 mod fai 同余
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

$c = Ek(64, $pub);
$m = Dk($c, $pri);
var_dump($m);