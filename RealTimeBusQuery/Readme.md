# 实时公交系统
## 2020年计算机设计大赛校赛参赛作品 _(2020.05.13 ~ 2020.07.05)_

**技术栈**：
* HTML
* CSS
* JS
* PHP
* SQL
* Python
* 其他

**主要开发工具/环境**：Visual Studio Code, PhpStorm, MySQL

结合高德地图API实现了公交车的实时位置查询与信息管理

位置查询部分：使用树莓派Zero W通过GPS模块获取定位信息，使用Python通过Wi-Fi上传到腾讯云服务器；服务器端使用PHP接收定位信息存储在MySQL中，并响应前端的查询请求返回定位信息；用户登录后选择路线，通过Ajax从服务器查询路线中的标识点和设备（车辆）的定位信息，结合高德地图API将定位信息展示在地图上

后台管理部分：前端实现机构、路线、设备等信息的添加、修改、删除、查询展示等功能，通过Ajax向服务器发起请求，后端通过PHP接收请求并对MySQL中的数据进行增删改查

项目没能通过校赛初筛，后来完善了一下，作为《移动Web应用开发》课程期末作业交了。因为感觉对HTML、CSS、JS还不太熟悉，想再练习一下，所以没用框架

**目录结构**：
```sh
.
├── Backend  #后台部分
│   ├── device.php  #设备管理、定位上报与获取API
│   ├── identification.php  #标识点管理API
│   ├── org.php  #机构注册登录API
│   ├── route.php  #路线管理API
│   └── user.php  #用户注册登录API
├── EdgeDevice  #树莓派脚本
│   └── EdgeDevice.py  #树莓派获取、上传定位脚本
├── Frontend  #前端部分
│   ├── Device  #设备管理页面
│   ├── Identification  #标志点管理页面
│   ├── Lib
│   │   └── sha512-min.js  #Crypto-JS的SHA512库（https://code.google.com/archive/p/crypto-js/）
│   ├── Map  #定位展示页面
│   ├── MapOption
│   │   └── selectRoute  #选择路线页面
│   ├── Org  #机构注册登录页面
│   ├── Route  #路线管理页面
│   └── User  #用户注册登录页面
└── SQL  #数据库脚本
    └── init.sql  #建库建表与插入测试数据脚本
```