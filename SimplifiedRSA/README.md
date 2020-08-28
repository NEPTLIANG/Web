# 简化的RSA加解密、数字签名系统
## 大三第一学期学校课程《信息安全与保密》期末作业 _(2019.12.23 ~ 2020.01.01)_

**技术栈**：
* HTML
* CSS
* JS（少量）
* PHP
* 其他

**主要开发工具**：PhpStorm

用PHP实现了简化（素数不大）的RSA算法及加解密、数字签名操作

由于主要任务是实现RSA加解密与数字签名，所以没有采用大整数运算，p和q两个素数不大，都在2的32到48次方(4.29E9~2.81E14)

**目录结构**：
```sh
.
├── Client  #前端页面
│   ├── DigitalSignature  #数字签名页面
│   │   ├── DigitalSignature.html
│   │   └── Style
│   │       ├── index.css        
│   │       └── Result.css       
│   └── EncryAndDecry
│       └── Style
│           ├── index.css       
│           └── Result.css      
├── index.html  #主页，即加解密页面
└── Server
    ├── DigitalSignature  #数字签名部分
    │   ├── DigitalSignature.php  #数字签名、验证等函数实现
    │   ├── SignatureResult.php  #签名调用及结果页面
    │   └── VerifyResult.php  #签名验证调用及结果页面
    └── EncryAndDecry  #加解密部分
        ├── DecryptionResult.php  #解密调用及结果页面
        ├── EncryptionResult.php  #加密调用及结果页面
        └── SimplifiedRSA.php  #素性检测、加解密等函数实现与密钥生成
```