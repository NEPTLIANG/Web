<?php
include("SimplifiedRSA.php");
//echo "fuck";
$em = $_POST["em"];
//if ($em > 110) {
//    echo "<script>alert(/数值过大，暂时只支持2~110/);</script>";
//    exit(1);
//}
if ($em != "") {
    $c = Ek($em, $pub);
//    echo "<p>公钥{e,n}：</p>"
//        . "<p id=\"epub\">{" . $pub["e"] . "," . $pub["n"] . "}</p>"
//        . "<p>私钥{p,q,d}：</p>"
//        . "<p id=\"epri\">{" . $pri["p"] . "," . $pri["q"] . "," . $pri["d"] . "}</p>"
//        . "<p>密文：</p>"
//        . "<p id=\"ec\">" . $c . "</p>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RSA加解密</title>
    <link href="../Client/EncryAndDecry/Style/Result.css" rel="stylesheet"/>
</head>
<body>
<div class="out">
    <h1>RSA加解密</h1>
    <div class="card">
        <h2>加密结果</h2>
        <?php
        echo "<p>公钥{e,n}：</p>"
            . "<p id=\"epub\" style=\"font-weight: bold; font-size: 20px;\">{" . $pub["e"] . "," . $pub["n"] . "}</p>"
            . "<p>私钥{p,q,d}：</p>"
            . "<p id=\"epri\" style=\"font-weight: bold; font-size: 20px;\">{" . $pri["p"] . "," . $pri["q"] . "," . $pri["d"] . "}</p>"
            . "<p>密文：</p>"
            . "<p id=\"ec\" style=\"font-weight: bold; font-size: 20px;\">" . $c . "</p>";
        ?>
    </div>
</div>
</body>
</html>