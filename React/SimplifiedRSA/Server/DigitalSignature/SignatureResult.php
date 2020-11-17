<?php
include("DigitalSignature.php");
$em = $_POST["em"];
$c = signature($em, $pri);
$c = $em . "x" . $c;

exit(json_encode([
    'pubKey' => "{{$pub["e"]},{$pub["n"]}}",  //公钥{e,n}
    'priKey' => "{{$pri["p"]},{$pri["q"]},{$pri["d"]}}", //私钥{p,q,d}
    'sign' => $c  //签名sign
]));