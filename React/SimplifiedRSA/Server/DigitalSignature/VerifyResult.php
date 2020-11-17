<?php
include("DigitalSignature.php");
$dc = $_POST["dc"];
$dpub = $_POST["dpub"];
$index = strrpos($dc, "x");
//$index = strlen($dc) - 70;
$em = substr($dc, 0, $index);
$dc = substr($dc, $index + 1, strlen($dc) - $index);
//$dc = substr($dc, $index + 1, 70);
$dpub = substr($dpub, 1, strlen($dpub) - 2);  //取子串：substr($原串, $start, $length)
$dpub = explode(",", $dpub . substr(2, strlen($dc) - 1));  //分割字符串： $数组=explode($分割字符, $字符串)
$dpub = ["e" => (int)$dpub[0], "n" => (int)$dpub[1]];
$dm = verify($dc, $dpub);

$hash = hash("sha256", $em);
if ($hash == $dm) {
    exit(json_encode([
        'success' => 'true',
        'hash' => $dm  //计算出的散列码
    ]));
} else {
    exit(json_encode([
        'success' => 'false',
        'hash' => $dm  //计算出的散列码
    ]));
}

