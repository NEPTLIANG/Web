# Web
Web开发学习，由于项目都不是很大而且语言相关程度高，所以放在同一个仓库

常用语言：**JS, PHP, Python**

---


# 一些个小小小小小项目

## 1. 实时公交系统
### 2020年计算机设计大赛校赛参赛作品 _(2020.05.13 ~ 2020.07.05)_

**代码已迁移至[https://github.com/NEPTLIANG/RealTimeBusQuery](https://github.com/NEPTLIANG/RealTimeBusQuery)**

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

[github.com/NEPTLIANG/Web/tree/master/RealTimeBusQuery](https://github.com/NEPTLIANG/Web/tree/master/RealTimeBusQuery)

---


## 2. “智慧学工”系统部分页面
### 初入Vue开发 _(2020.01.05 ~ 2020.02.11)_

**代码已迁移至[https://github.com/NEPTLIANG/intelli-edu-admin](https://github.com/NEPTLIANG/intelli-edu-admin)**

**主要技术**：
* uni-app(Vue)

**主要开发工具**：VIM, 微信开发者工具

包含学校计算机社团一位师兄的学校项目中的6个页面，采用uni-app（[uniapp.dcloud.io/README](https://uniapp.dcloud.io/README)，使用Vue.js开发前端应用的框架）。师兄想让我们练练手，所以给我们分配了几个页面

我负责“文章列表”、“实践经历管理”、“个人主页”三个部分共6个页面，其中实践经历管理分为添加实践经历、修改实践经历、查询单条实践经历、查询所有实践经历4个页面

因为想熟悉VIM的使用，所以主要采用VIM

[github.com/NEPTLIANG/Web/tree/master/intelli-edu-admin](https://github.com/NEPTLIANG/Web/tree/master/intelli-edu-admin)

---


## 3. 简化的RSA加解密、数字签名系统
### 大三第一学期学校课程《信息安全与保密》期末作业 _(2019.12.23 ~ 2020.01.01)_

**代码已迁移至[https://github.com/NEPTLIANG/SimplifiedRSA](https://github.com/NEPTLIANG/SimplifiedRSA)**

**技术栈**：
* HTML
* CSS
* JS（少量）
* PHP
* 其他

**主要开发工具**：PhpStorm

用PHP实现了简化（素数不大）的RSA算法及加解密、数字签名操作

由于主要任务是实现RSA加解密与数字签名，所以没有采用大整数运算，p和q两个素数不大，都在2的32到48次方(4.29E9~2.81E14)

[github.com/NEPTLIANG/Web/tree/master/SimplifiedRSA](https://github.com/NEPTLIANG/Web/tree/master/SimplifiedRSA)

---


## 4. 教务管理系统
### 大三第一学期网站建设与开发课程设计 _(2019.10 ~ 2019.12)_

**技术栈**：
* HTML
* CSS
* JS
* ASP
* SQL
* 其他

**主要开发工具**：Visual Studio, MS SQL Server

实现了数据库增删改查等基本功能，学校课程教的ASP所以只能采用ASP、VS和SQL Server

[github.com/NEPTLIANG/Web/tree/master/EducationalAdministration](https://github.com/NEPTLIANG/Web/tree/master/EducationalAdministration)

---


## 5. 轮盘时钟
### CSS动效练习 _(2019.10)_

**代码已迁移至[https://github.com/NEPTLIANG/RotateClock](https://github.com/NEPTLIANG/RotateClock)**

**涉及技术**：
* HTML
* CSS
* JS
* 其他

**主要开发工具**：WebStorm

用CSS、JS实现了一个旋转的轮盘时钟。

之前学校计算机社团招新前叫我收集理事们的技术作品来展示，结果只有一位理事交了份作品，我又刚好在网上看到一个安卓的什么“抖X网红时钟动态壁纸”，就试着用CSS和JS实现了一个类似的交了上去。所幸最后另一位理事交了第二份作品，用不上我这个。

由于当时时间比较紧迫所以用的WebStorm

[github.com/NEPTLIANG/Web/tree/master/RotateClock/RotateClock_v1.0](https://github.com/NEPTLIANG/Web/tree/master/RotateClock/RotateClock_v1.0)（v2.0~v4.0都是待修改的半成品）

---

## 6. “遇见交友平台”订单填写、套餐展示页面
### 2018年“互联网+创新创业比赛”参赛作品 _(2019.05)_

**涉及技术**：
* HTML
* CSS
* 其他

完成了订单填写、套餐展示共2个页面及其样式，当时只是为了初赛展示，没有实现功能

[github.com/NEPTLIANG/Web/tree/master/InternetPlusCompetition](https://github.com/NEPTLIANG/Web/tree/master/InternetPlusCompetition)

---

# 用JS做的几道力扣周赛题 _(2019.08 至今)_

只有一道简单题是在周赛的1.5小时内Ac掉的……

[github.com/NEPTLIANG/Web/tree/master/JavaScript](https://github.com/NEPTLIANG/Web/tree/master/JavaScript)

---

# 用PHP做的几道力扣周赛题 _(2019.10 至今)_

只有两道简单题是在周赛的1.5小时内Ac掉的……

[github.com/NEPTLIANG/Web/tree/master/PHP](https://github.com/NEPTLIANG/Web/tree/master/PHP)

---

# 文件目录结构

* **EducationalAdministration**  
    _[教务管理系统](https://github.com/NEPTLIANG/Web#2-%E6%95%99%E5%8A%A1%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F)_
* **HTML_CSS**  
    _学习HTML和CSS的草稿本_
* **InternetPlusCompetition**  
    _[“遇见交友平台”订单填写、套餐展示页面](https://github.com/NEPTLIANG/Web#5-%E9%81%87%E8%A7%81%E4%BA%A4%E5%8F%8B%E5%B9%B3%E5%8F%B0%E8%AE%A2%E5%8D%95%E5%A1%AB%E5%86%99%E5%A5%97%E9%A4%90%E5%B1%95%E7%A4%BA%E9%A1%B5%E9%9D%A2)_
* **JavaScript**  
    _学习JS的草稿本，包含[做过的几道力扣周赛题](https://github.com/NEPTLIANG/Web#%E7%94%A8js%E5%81%9A%E7%9A%84%E5%87%A0%E9%81%93%E5%8A%9B%E6%89%A3%E5%91%A8%E8%B5%9B%E9%A2%98)_
* **PHP**  
    _学习PHP的草稿本，包含[做过的几道力扣周赛题](https://github.com/NEPTLIANG/Web#%E7%94%A8php%E5%81%9A%E7%9A%84%E5%87%A0%E9%81%93%E5%8A%9B%E6%89%A3%E5%91%A8%E8%B5%9B%E9%A2%98)_
* **RealTimeBusQuery**  
    _[实时公交系统](#)_
* **RotateClock**  
    _[轮盘时钟](https://github.com/NEPTLIANG/Web#4-%E8%BD%AE%E7%9B%98%E6%97%B6%E9%92%9F)_
* **SQL**  
    _学习SQL的草稿本，包含：_
    * _教务管理系统的数据库建表文件 educationalAdministration.sql_
    * _学校大二第2学期课程《数据库技术课程设计》建表文件 TextBookManagement.sql_
    * _学校大二第1学期课程《数据库原理》实验文件 /SQLExperiment\d.sql/_
    * _学校大三第1学期课程《大型数据库设计》（Oracle）实验文件 /OracleExperiment\d(v\d.\d)?.sql/_
* **SimplifiedRSA**  
    _[简化的RSA加解密、数字签名系统](https://github.com/NEPTLIANG/Web#1-%E7%AE%80%E5%8C%96%E7%9A%84rsa%E5%8A%A0%E8%A7%A3%E5%AF%86%E6%95%B0%E5%AD%97%E7%AD%BE%E5%90%8D%E7%B3%BB%E7%BB%9F)_
* **WebCourse**  
    _学校大二第2学期课程《网站建设与开发》（ASP）的作业和实验文件_
* **intelli-edu-admin**  
    _[“智慧学工”系统部分页面](https://github.com/NEPTLIANG/Web#3-%E6%99%BA%E6%85%A7%E5%AD%A6%E5%B7%A5%E7%B3%BB%E7%BB%9F%E9%83%A8%E5%88%86%E9%A1%B5%E9%9D%A2)_