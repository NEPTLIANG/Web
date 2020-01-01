<?php
include("SimplifiedRSA.php");

function encryStr($s, $pub) {
    $c = "";
    for ($i = 0; $i < strlen($s); $i++) {
        $ascii = ord($s[$i]);
        $cChar = dechex(Ek($ascii, $pub));
        while (strlen($cChar) != 8) {
            $cChar = "0" . $cChar;
        }
        $c = $c.$cChar;
    }
    return $c;
}

$em = $_POST["em"];
//if ($em > 199999) {
//    echo "<script>alert(/数值过大，暂时只支持-199999~199999/);</script>";
////    exit(1);
//}
//if ($em != "") {
//    $c = Ek($em, $pub);
////    echo "<p>公钥{e,n}：</p>"
////        . "<p id=\"epub\">{" . $pub["e"] . "," . $pub["n"] . "}</p>"
////        . "<p>私钥{p,q,d}：</p>"
////        . "<p id=\"epri\">{" . $pri["p"] . "," . $pri["q"] . "," . $pri["d"] . "}</p>"
////        . "<p>密文：</p>"
////        . "<p id=\"ec\">" . $c . "</p>";
//}
$c = encryStr($em, $pub);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RSA加解密</title>
    <link href="../../Client/EncryAndDecry/Style/Result.css" rel="stylesheet"/>
</head>
<body>
<div class="out">
    <h1>RSA加解密</h1>
    <div class="card">
        <h2>加密结果</h2>
        <?php
        echo "<p>公钥{e,n}：</p>"
            . "<p id=\"epub\" style=\"font-weight: bold; font-size: 20px; line-break: anywhere;\">{" . $pub["e"] . "," . $pub["n"] . "}</p>"
            . "<p>私钥{p,q,d}：</p>"
            . "<p id=\"epri\" style=\"font-weight: bold; font-size: 20px; line-break: anywhere;\">{" . $pri["p"] . "," . $pri["q"] . "," . $pri["d"] . "}</p>"
            . "<p>密文：</p>"
            . "<p id=\"ec\" style=\"font-weight: bold; font-size: 20px; line-break: anywhere;\">" . $c . "</p>";
        ?>
    </div>
</div>
</body>
</html>