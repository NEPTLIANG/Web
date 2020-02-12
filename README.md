# Web
Web开发学习，由于文件都不是很大而且语言相关程度高，所以放在同一个仓库

常用语言：__JS, PHP, SQL__

---

# 目录结构

* __EducationalAdministration__  
    _教务管理系统_
* __HTML_CSS__  
    _学习HTML和CSS的草稿本_
* __InternetPlusCompetition__  
    _“遇见交友平台”订单填写、套餐展示页面_
* __JavaScript__  
    _学习JS的草稿本，包含做过的几道力扣周赛题_
* __PHP__  
    _学习PHP的草稿本，包含做过的几道力扣周赛题_
* __RotateClock__  
    _轮盘时钟_
* __SQL__  
    _学习SQL的草稿本，包含：_
    * _教务管理系统的数据库建表文件 educationalAdministration.sql_
    * _学校大二第2学期课程《数据库技术课程设计》建表文件 TextBookManagement.sql_
    * _学校大二第1学期课程《数据库原理》实验文件 /SQLExperiment\d.sql/_
    * _学校大三第1学期课程《大型数据库设计》（Oracle）实验文件 /OracleExperiment\d(v\d.\d)?.sql/_
* __SimplifiedRSA__  
    _简化的RSA加解密、数字签名系统_
* __WebCourse__  
    _学校大二第2学期课程《网站建设与开发》（ASP）的作业和实验文件_
* __intelli-edu-admin__  
    _“智慧学工”系统部分页面_

---

# 一些个小小小小小项目

## 1. 简化的RSA加解密、数字签名系统
### 大三第一学期学校课程《信息安全与保密》期末作业

__技术栈__：
* HTML
* CSS
* JS（少量）
* PHP
* 其他

__主要开发工具__：PhpStorm

用PHP实现了简化（素数不大）的RSA算法及加解密、数字签名操作

由于主要任务是实现RSA加解密与数字签名，所以没有采用大整数运算，p和q两个素数不大，都在2的32到48次方

[github.com/NEPTLIANG/Web/tree/master/SimplifiedRSA](https://github.com/NEPTLIANG/Web/tree/master/SimplifiedRSA)

---

## 2. 教务管理系统
### 大三第一学期网站建设与开发课程设计

__技术栈__：
* HTML
* CSS
* JS
* ASP
* SQL
* 其他

__主要开发工具__：Visual Studio, MS SQL Server

实现了数据库增删改查等基本功能，学校课程教的ASP所以只能采用ASP、VS和SQL Server

[github.com/NEPTLIANG/Web/tree/master/EducationalAdministration](https://github.com/NEPTLIANG/Web/tree/master/EducationalAdministration)

---

## 3. “智慧学工”系统部分页面
### 初入Vue开发

__主要技术__：
* uni-app(Vue)

__主要开发工具__：VIM, 微信开发者工具

包含学校计算机社团一位师兄的毕业设计中的6个页面，采用uni-app（[uniapp.dcloud.io/README]()，使用Vue.js开发前端应用的框架）。师兄想让我们练练手，所以给我们分配了几个页面

我负责“文章列表”、“实践经历管理”、“个人主页”三个部分共6个页面，其中实践经历管理分为添加实践经历、修改实践经历、查询单条实践经历、查询所有实践经历4个页面

因为想熟悉VIM的使用，所以主要采用VIM

[github.com/NEPTLIANG/Web/tree/master/intelli-edu-admin](https://github.com/NEPTLIANG/Web/tree/master/intelli-edu-admin)

---

## 4. 轮盘时钟
### CSS动效练习

__涉及技术__：
* HTML
* CSS
* JS
* 其他

__主要开发工具__：WebStorm

用CSS、JS实现了一个旋转的轮盘时钟。

之前学校计算机社团招新前叫我收集理事们的技术作品来展示，结果只有一位理事交了份作品，我又刚好在网上看到一个安卓的什么“抖X网红时钟动态壁纸”，就试着用CSS和JS实现了一个类似的交了上去。所幸最后另一位理事交了第二份作品，用不上我这个。

由于当时时间比较紧迫所以用的WebStorm

[github.com/NEPTLIANG/Web/tree/master/RotateClock/RotateClock_v1.0](https://github.com/NEPTLIANG/Web/tree/master/RotateClock/RotateClock_v1.0)（v2.0~v4.0都是待修改的半成品）

---

## 5. “遇见交友平台”订单填写、套餐展示页面
### 2018年“互联网+创新创业比赛”参赛作品

__涉及技术__：
* HTML
* CSS
* 其他

完成了订单填写、套餐展示共2个页面及其样式，当时只是为了初赛展示，没有实现功能
[github.com/NEPTLIANG/Web/tree/master/InternetPlusCompetition](https://github.com/NEPTLIANG/Web/tree/master/InternetPlusCompetition)

---

附：

# 用JS做的几道力扣周赛题

只有一道简单题是在周赛的1.5小时内Ac掉的……

[github.com/NEPTLIANG/Web/tree/master/JavaScript](https://github.com/NEPTLIANG/Web/tree/master/JavaScript)

---

# 用PHP做的几道力扣周赛题

只有两道简单题是在周赛的1.5小时内Ac掉的……

[github.com/NEPTLIANG/Web/tree/master/PHP](https://github.com/NEPTLIANG/Web/tree/master/PHP)