<?php

include("SimplifiedRSA.php");

/** 处理字符串并加密
 * @param $s
 * @param $pub
 * @return string
 */
function encryStr($s, $pub)
{
    $c = "";
    for ($i = 0; $i < strlen($s); $i++) {
        $ascii = ord($s[$i]);
        $cChar = dechex(Ek($ascii, $pub));
        while (strlen($cChar) != 8) {
            $cChar = "0" . $cChar;
        }
        $c = $c . $cChar;
    }
    return $c;
}

$em = $_POST["em"];
$c = encryStr($em, $pub);

exit(json_encode([
    'pubKey' => "{{$pub['e']},{$pub["n"]}}",  //公钥{e,n}
    'priKey' => "{{$pri["p"]},{$pri["q"]},{$pri["d"]}}",  //私钥{p,q,d}
    'cipher' => $c  //密文
]));