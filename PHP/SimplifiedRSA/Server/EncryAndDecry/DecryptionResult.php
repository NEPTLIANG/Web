<?php
/*Test case:
公钥{e,n}：{43,119}
私钥{p,q,d}：//{7,17,67}
密文：106*/
include("SimplifiedRSA.php");
$dpri = $_POST["dpri"];

//$dpri = "{7,17,67}";

if ($dpri != "") {
    $dc = $_POST["dc"];

//    $dc = 106;

    $dpri = substr($dpri, 1, strlen($dpri) - 2);  //取子串：substr($原串, $start, $length)
    $dpri = explode(",", $dpri . substr(2, strlen($dc) - 1));  //分割字符串： $数组=explode($分割字符, $字符串)
    $pri = ["p" => (int)$dpri[0], "q" => (int)$dpri[1], "d" => (int)$dpri[2]];
    $dm = Dk($dc, $pri);
//    var_dump($dm);
//    echo "<p>明文：</p>"
//        . "<p id=\"dm\">" . $dm . "</p>";
}
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
        <h2>解密结果</h2>
        <?php
        echo "<p>明文：</p>"
            . "<p id=\"dm\" style=\"font-weight: bold; font-size: 20px;\">" . $dm . "</p>";
        ?>
    </div>
</div>
</body>
</html>