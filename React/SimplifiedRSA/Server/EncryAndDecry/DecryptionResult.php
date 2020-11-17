<?php
/* Test case:
公钥{e,n}：{43,119}
私钥{p,q,d}：//{7,17,67}
密文：106*/
include("SimplifiedRSA.php");

function decryStr($c, $pri)
{
    $dm = "";
    for ($i = 0; $i * 8 < strlen($c); $i++) {
        $num = hexdec(substr($c, $i * 8, 8));
        $char = chr(Dk($num, $pri));
        $dm = $dm . $char;
    }
    return $dm;
}

$dpri = $_POST["dpri"];
if ($dpri != "") {
    $dc = $_POST["dc"];
    $dpri = substr($dpri, 1, strlen($dpri) - 2);  //取子串：substr($原串, $start, $length)
    $dpri = explode(",", $dpri . substr(2, strlen($dc) - 1));  //分割字符串： $数组=explode($分割字符, $字符串)
    $pri = ["p" => (int)$dpri[0], "q" => (int)$dpri[1], "d" => (int)$dpri[2]];
    $dm = decryStr($dc, $pri);
}

exit(json_encode([
    'plain' => $dm
]));
