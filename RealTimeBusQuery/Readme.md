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

位置查询部分：使用树莓派Zero W通过GPS模块获取定位信息，使用Python通过Wi-Fi上传到腾讯云服务器；服务器端使用PHP接收定位信息存储在MySQL中，并响应前端的查询请求返回定位信息；前端通过Ajax从服务器查询定位信息，结合高德地图API将定位信息展示在地图上

后台管理部分：前端实现机构、路线、设备等信息的添加、修改、删除、查询展示等功能，通过Ajax向服务器发起请求，后端通过PHP接收请求并对MySQL中的数据进行增删改查

项目没能通过校赛初筛，后来完善了一下，作为《移动Web应用开发》课程期末作业交了。因为感觉对HTML、CSS、JS还不太熟悉，想再练习一下，所以没用框架

[github.com/NEPTLIANG/Web/tree/master/RealTimeBusQuery](https://github.com/NEPTLIANG/Web/tree/master/RealTimeBusQuery)

**目录结构**：
```sh
.
├── Backend  #后台部分
│   ├── device.php
│   ├── identification.php
│   ├── org.php
│   ├── route.php
│   └── user.php
├── EdgeDevice  #树莓派脚本
│   └── EdgeDevice.py
├── Frontend
│   ├── Device
│   ├── Identification
│   ├── Lib
│   ├── Map
│   ├── MapOption
│   │   ├── pick
│   │   └── selectRoute
│   ├── Org
│   ├── Route
│   └── User
├── Readme.md
└── SQL
    └── init.sql
```