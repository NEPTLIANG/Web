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
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>验证结果</title>
    <link href="../../Client/EncryAndDecry/Style/Result.css" rel="stylesheet"/>
</head>
<body>
<div class="out">
    <h1>数字签名</h1>
    <div class="card">
        <h2>验证结果</h2>
        <?php
        $hash = hash("sha256", $em);
        if ($hash == $dm) {
            echo "<p id=\"ec\" class=\"result\" style=\"line-break: anywhere\">签名有效</p>";
        } else {
            echo "<p id=\"ec\" class=\"result\" style=\"line-break: anywhere\">签名无效</p>";
        }
        echo "<p>计算出的散列码：</p>"
            . "<p id=\"ec\" class=\"result\" style=\"line-break: anywhere\">" . $dm . "</p>";
        ?>
    </div>
</div>
</body>
</html>