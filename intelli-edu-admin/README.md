# “智慧学工”系统部分页面
## 初入Vue开发 _(2020.01.05 ~ 2020.02.11)_

**主要技术**：
* uni-app(Vue)

**主要开发工具**：VIM, 微信开发者工具

包含学校计算机社团一位师兄的学校项目中的6个页面，采用uni-app（[uniapp.dcloud.io/README](https://uniapp.dcloud.io/README)，使用Vue.js开发前端应用的框架）。师兄想让我们练练手，所以给我们分配了几个页面

我负责“文章列表”、“实践经历管理”、“个人主页”三个部分共6个页面，其中实践经历管理分为添加实践经历、修改实践经历、查询单条实践经历、查询所有实践经历4个页面

因为想熟悉VIM的使用，所以主要采用VIM

---

# intelli-edu-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

**目录结构**：
```bash
.
├── src  #源码目录
│   ├── components  #组件目录
│   │   ├── picker  #选择组件
│   │   │   ├── date-picker.vue  #日期选择组件
│   │   │   └── selector-picker.vue  #普通选择组件
│   │   ├── show-card  #实践经历列表项组件
│   │   ├── uni-search-bar  #组件市场的搜索栏组件
│   │   └── zhtx-uploadImg  #组件市场的文件上传组件（未实现上传功能）
│   ├── pages  #页面目录
│   │   ├── article-list  #文章列表页面
│   │   ├── practical-experience  #实践经历管理部分
│   │   │   ├── practical-experience-alter.vue  #修改实践经历信息页面
│   │   │   ├── practical-experience-insert.vue  #添加实践经历页面
│   │   │   ├── practical-experience-select-all.vue  #实践经历列表页面
│   │   │   └── practical-experience-select-single.vue  #单条实践经历信息展示页面
│   │   └── user-home  #用户主页页面
│   ├── static
│   │   ├── IconFont  #谷歌Material Design图标的Icon Fonts
│   │   │   ├── IconFont.css
│   │   │   ├── MaterialIcons-Regular.ttf
│   │   │   ├── MaterialIcons-Regular.woff
│   │   │   └── MaterialIcons-Regular.woff2
│   │   └── 时间.png
│   └── uni.scss
└── tsconfig.json
```