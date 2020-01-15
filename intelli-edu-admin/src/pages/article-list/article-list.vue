<template>
    <!--文章列表页面-->
    <view class="body">
        <view class="searchArea">
            <form @submit="search">
                <input type="text" name="searchText" placeholder="请输入关键字查询" class="searchBox">
                <button form-type="submit" plain="true" class="searchButton">搜索</button>
            </form>
        </view>
        <view v-for="item in items" :key="item.title" class="item">  <!--文章列表-->
            <image :src="item.img" mode="aspectFill" class="img">  <!--图片-->
            <view class="content">
                <view class="itemTitle">{{item.title}}</view>  <!--标题-->
                <view class="abstract">{{item.abstract}}</view>  <!--摘要-->
            </view>
            <view class="info">
                <view class="date">{{item.date}}</view>  <!--日期-->
                <view class="pageView"><text class="material-icons pvIcon">&#xe8a0;</text> {{item.pageView}}</view>
            </view>  <!--浏览量-->
        </view>
        <button @click="more" class="more">加载更多……</button>
        <view class="buttom"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                "items": [{  //文章对象数组
                    "img": "../../static/logo.png",
                    "title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或",
                    "abstract": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所",
                    "date": "2019-10-12",
                    "pageView": "11"
                }, {
                    "img": "../../static/logo.png",
                    "title": "富力物业",
                    "abstract": "富力物业",
                    "date": "2019-10-13",
                    "pageView": "112"
                }, {
                    "img": "../../static/logo.png",
                    "title": "富力物业华南区域2020届校园招聘广东站",
                    "abstract": "富力物业华南区域2020届校园招聘广东站全面启动",
                    "date": "2019-10-124",
                    "pageView": "113"
                }]
            }
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
    .img {  /*文章图片*/
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
