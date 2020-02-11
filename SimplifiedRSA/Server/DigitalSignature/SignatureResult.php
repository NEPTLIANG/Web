<?php
include("DigitalSignature.php");
$em = $_POST["em"];
$c = signature($em, $pri);
$c = $em . "x" . $c;
//$c = $em . $c;
//$c = signature("Hello", $pri);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>签名结果</title>
    <link href="../../Client/EncryAndDecry/Style/Result.css" rel="stylesheet"/>
</head>
<body>
<div class="out">
    <h1>数字签名</h1>
    <div class="card">
        <h2>签名结果</h2>
        <?php
        echo "<p>公钥{e,n}：</p>"
            . "<p id=\"ec\" class=\"result\" style=\"line-break: anywhere\">{" . $pub["e"] . "," . $pub["n"] . "}</p>"
            . "<p>私钥{p,q,d}：</p>"
            . "<p id=\"ec\" class=\"result\" style=\"line-break: anywhere\">{" . $pri["p"] . "," . $pri["q"] . "," . $pri["d"] . "}</p>"
            . "<p>签名：</p>"
            . "<p id=\"ec\" class=\"result\" style=\"line-break: anywhere\">" . $c . "</p>";
        ?>
    </div>
</div>
</body>
</html>