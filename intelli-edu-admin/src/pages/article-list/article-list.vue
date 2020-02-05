<template>
    <!--文章列表页面-->
    <view class="body">
        <view class="searchArea">
            <form @submit="search">
                <input type="text" name="keyword" placeholder="请输入关键字查询" class="searchBox">
                <button form-type="submit" plain="true" class="searchButton">搜索</button>
            </form>
        </view>
        <view v-for="index in lenOfList" class="item">  <!--文章列表-->
            <image :src="articleList[index-1].article_logo" mode="aspectFill" class="article_logo">  <!--图片-->
            <view class="content">
                <view class="itemTitle">{{articleList[index-1].article_title}}</view>  <!--标题-->
                <view class="abstract">{{articleList[index-1].article_description}}</view>  <!--摘要-->
            </view>
            <view class="info">
                <view class="publish_time">{{articleList[index-1].publish_time}}</view>  <!--日期-->
                <view class="article_reader"><text class="material-icons pvIcon">&#xe8a0;</text> {{articleList[index-1].article_reader}}</view>
            </view>  <!--浏览量-->
        </view>
        <button @click="getMoreArticle" v-if="thereAreMoreArticle" class="more">加载更多……</button>
        <view class="buttom"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                userNmuber: "",
                url: `${getApp().globalData.url}/article/number/${this.userNmuber}`,
                lenOfList: 10,
                thereAreMoreArticle: true,
                articleList: [{  //文章对象数组
                    "article_id": "11111",
                    "article_logo": "../../static/logo.png",
                    "article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或",
                    "article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所",
                    "publish_time": "2019-10-12",
                    "article_reader": "11",
                    "article_status": 1
                }, {
                    "article_id": "222222",
                    "article_logo": "../../static/logo.png",
                    "article_title": "富力物业",
                    "article_description": "富力物业",
                    "publish_time": "2019-10-13",
                    "article_reader": "112",
                    "article_status": 1
                }, {
                    "article_id": "333333",
                    "article_logo": "../../static/logo.png",
                    "article_title": "富力物业华南区域2020届校园招聘广东站",
                    "article_description": "富力物业华南区域2020届校园招聘广东站全面启动",
                    "publish_time": "2019-10-124",
                    "article_reader": "113",
                    "article_status": 1
                }]
            }
        },
        methods: {
            getArticles: function (responseStr) {
                var articleList = JSON.parse(responseStr).data.list
                var article = {}
                for (var index in articleList) {
                    article = {
                        "article_id": articleList[index].article_id,
                        "article_logo": articleList[index].article_logo,
                        "article_title": articleList[index].article_title,
                        "article_description": articleList[index].article_description,
                        "publish_time": articleList[index].publish_time,
                        "article_reader": articleList[index].article_reader,
                        "article_status": articleList[index].article_status
                    }
                    this.articleList.push(article)
                }
            },
            getMoreArticle: function () {
                if (this.lenOfList+10 < this.articleList.length) {
                    this.lenOfList += 10
                    // console.log(this.lenOfList)
                } else {
                    this.lenOfList = this.articleList.length
                    this.thereAreMoreArticle = false
                    // console.log(this.lenOfList)
                }
            },
            search: function (e) {
                var url = getApp().globalData.url
                var keyword = e.detail.keyword
            }
        },
        created() {
            if (typeof XMLHttpRequest != "undifined") {
                var request = new XMLHttpRequest()
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        if ((request.status>=200 && request.status<300) || request.status==304) {
                            var response = {}
                            try {
                                response = JSON.parse(request.responseText)
                            } catch(e) {
                                uni.showModal({
                                    title: "请求失败",
                                    content: "返回数据格式错误",
                                    showCancel: false,
                                    success: function () {
                                        // uni.navigateBack()
                                    }
                                })
                            }
                            if (response.code == 200) {
                                this.getArticles(request.responseText)
                            } else {
                                uni.showModal({
                                    title: "查询失败",
                                    content: response.message,
                                    showCancel: false,
                                    success: function (res) {
                                        if (res.confirm) {
                                            // uni.navigateBack()
                                        }
                                    }
                                })
                            }
                        } else {
                            uni.showModal({
                                content: "请求失败",
                                showCancel: false,
                                success: function () {
                                    uni.navigateBack()
                                }
                            })
                        }
                    }
                }
                request.open("GET", this.url, true)
                request.send(this.userNmuber)
            } else if (typeof ActiveXObject != "undifined") {
                var request = new ActiveXObject("MSXML2.XMLHttp")
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        if ((request.status>=200 && request.status<300) || request.status==304) {
                            var response = JSON.parse(request.responseText)
                            if (response.code == 200) {
                                this.getArticles(request.responseText)
                            } else {
                                uni.showModal({
                                    title: "查询失败",
                                    content: response.message,
                                    showCancel: false,
                                    success: function () {
                                        uni.navigateBack()
                                    }
                                })
                            }
                        } else {
                            uni.showModal({
                                content: "请求失败",
                                showCancel: false,
                                success: function () {
                                    uni.navigateBack()
                                }
                            })
                        }
                    }
                }
                request.open("GET", this.url, true)
                request.send(this.userNmuber)
            } else {
                uni.showModal({
                    title: "不支持的浏览器",
                    content: "请更换浏览器后重试",
                    showCancel: false,
                    onSuccess: function () {
                        uni.navigateBack()
                    }
                })
            }
            var testStr = '{"code":200,"success":true,"message":"查询成功","data":{"total":12,"list":[{"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1},{"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}]}}'
            this.getArticles(testStr)
        }
    }
</script>

<style>
    @import 'https://fonts.googleapis.com/icon?family=Material+Icons';  /*浏览量左边的Icon Fonts*/
    .body {  /*根view*/
        font-size: 16rpx;
    }
    .searchArea {
        background-color: #efefef;
        padding: 8rpx 16rpx;
    }
    .searchBox {
        display: inline-block;
        font-size: 16rpx;
        text-align: center;
        background-color: #fff;
        width: 90%;
        padding: 8rpx;
        border: 1rpx #bfbfbf solid;
    }
    .searchButton {
        display: inline-block;
        font-size: 16rpx;
        position: absolute;
        right: 16rpx;
        border-width: 0;
        width: max-content;
    }
    .item {  /*文章列表项*/
        padding: 16rpx;
        border-top: 1rpx #bfbfbf solid;
        border-bottom: 1px #bfbfbf solid;
    }
    .article_logo {  /*文章图片*/
        display: inline-block;
        width: 128rpx;
        height: 128rpx;
    }
    .content {  /*标题及摘要区域*/
        vertical-align: top;
        display: inline-block;
        width: 60%;
        margin-left: 16rpx;
    }
    .itemTitle {  /*文章标题*/
        font-size: 20rpx;
    }
    .abstract {
        color: #bfbfbf;
        margin-top: 8rpx;
    }
    .info {  /*日期及浏览量区域*/
        float: right;
        color: #bfbfbf;
        text-align: right;
    }
    .pvIcon {  /*浏览量前的图标*/
        font-size: 16rpx;
    }
    .more {  /*“更多”按钮*/
        font-size: 16rpx;
        text-align: center;
        background-color: #efefef;
        padding: 8rpx;
    }
    .buttom {
        background-color: #007fff;
        height: 128rpx;
    }
</style>
