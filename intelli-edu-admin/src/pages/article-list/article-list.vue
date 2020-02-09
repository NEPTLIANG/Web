<template>
    <!--文章列表页面-->
    <view class="body">
        <view class="searchArea">
		    <uni-search-bar placeholder="请输入关键字查询" :radius="100" @confirm="search" @cancel="cancelSearch"></uni-search-bar>
            <!-- <form @submit="search">
                <input type="text" name="keyword" placeholder="请输入关键字查询" class="searchBox">
                <button form-type="submit" plain="true" class="searchButton">搜索</button>
            </form> -->
        </view> 
        <view v-for="index in lenOfList" hover-class="uni-list-cell-hover">  <!--文章列表-->
            <navigator url="../index/index" class="item">
                <image :src="showList[index-1].article_logo" mode="aspectFill" class="article_logo">  <!--图片-->
                <view class="content">
                    <view class="itemTitle">{{showList[index-1].article_title}}</view>  <!--标题-->
                    <view class="abstract">{{showList[index-1].article_description}}</view>  <!--摘要-->
                </view>
                <view class="info">
                    <view class="publish_time">{{showList[index-1].publish_time}}</view>  <!--日期-->
                    <view class="article_reader"><text class="material-icons pvIcon">&#xe8a0;</text> {{showList[index-1].article_reader}}</view>  <!--浏览量-->
                </view>
            </navigator>
        </view>
        <button @click="getMoreArticle" v-if="thereAreMoreArticle" class="more">加载更多……</button>
        <view class="buttom"></view>
    </view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
    export default {
		components: {
			uniSearchBar
		},
        data() {
            return {
                userNmuber: "",
                url: `${getApp().globalData.url}/article/number/${this.userNmuber}`,
                lenOfList: 10,
                thereAreMoreArticle: true,
                showList: [],  //要显示的文章列表
                searchResultList: [],  //搜索返回的文章列表
                articleList: [/* {  //所有文章列表
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
                } */]
            }
        },
        methods: {
            getArticles: function (responseStr) {  //处理查询请求的响应，获取文章列表
                var articleList = JSON.parse(responseStr).data.list
                // this.articleList.concat(articleList)
                // this.showList.concat(this.articleList)
                var article = {}
                for (var index in articleList) {  //不知道为甚麽concat不了，只好逐个插入文章
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
                    this.showList.push(article)
                }
                if (this.lenOfList > this.showList.length) {  //判断是否需要隐藏“加载更多”
                    this.lenOfList = this.showList.length
                    this.thereAreMoreArticle = false
                }
                if (this.showList.length === 0) {  //若没有文章，弹框提示并返回
                    uni.showModal({
                        content: "无文章",
                        showCancel: false,
                        success: () => {
                            uni.navigateBack()
                        }
                    })
                }
            },
            getMoreArticle: function () {  //“加载更多”
                if (this.lenOfList+10 < this.articleList.length) {
                    this.lenOfList += 10
                    // console.log(this.lenOfList)
                } else {
                    this.lenOfList = this.articleList.length
                    this.thereAreMoreArticle = false
                    // console.log(this.lenOfList)
                }
            },
            search: function (e) {  //搜索文章
                var url = `${getApp().globalData.url}/article`
                var keyword = e.value
                /* if (typeof XMLHttpRequest != "undifined") {
                    var request = new XMLHttpRequest()
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304) {
                                var response = {}
                                try {
                                    response = JSON.parse(request.responseText)
                                } catch(e) {
                                    uni.showModal({
                                        content: "请求失败",
                                        showCancel: false
                                    })
                                }
                                if (response !== {}) {
                                    if (response.code == 200) {
                                        this.articleList = response.data.list
                                        if (this.lenOfList > this.articleList.length) {
                                            this.lenOfList = this.articleList.length
                                            this.thereAreMoreArticle = false
                                        }
                                    } else {
                                        uni.showModal({
                                            title: "查询失败",
                                            content: response.message,
                                            showCancel: false
                                        })
                                    }
                                }
                            } else {
                                uni.showModal({
                                    content: "请求失败",
                                    showCancel: false
                                })
                            }
                        }
                    }
                    request.open("GET", url, true)
                    request.send(keyword)
                } else if (typeof ActiveXObject != "undifined") {
                    var request = new ActiveXObject("MSXML2.XMLHttp")
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304) {
                                var response = {}
                                try {
                                    response = JSON.parse(request.responseText)
                                } catch (e) {
                                    uni.showModal({
                                        content: "请求失败",
                                        showCancel: false
                                    })
                                }
                                if (response !== {}) {
                                    if (response.code == 200) {
                                        this.articleList = response.data.list
                                        if (this.lenOfList > this.articleList.length) {
                                            this.lenOfList = this.articleList.length
                                            this.thereAreMoreArticle = false
                                        }
                                    } else {
                                        uni.showModal({
                                            title: "查询失败",
                                            content: response.message,
                                            showCancel: false
                                        })
                                    }
                                }
                            } else {
                                uni.showModal({
                                    content: "请求失败",
                                    showCancel: false
                                })
                            }
                        }
                    }
                    request.open("GET", url, true)
                    request.send(keyword)
                } else {
                    uni.showModal({
                        title: "不支持的浏览器",
                        content: "请更换浏览器再重试",
                        showCancel: "false"
                    })
                } */
                uni.request({
                    mothod: "GET",
                    url: url,
                    success: (response) => {
                        if ((response.statusCode>=200 && response.statusCode<300) || response.statusCode==304) {
                            var data = {}
                            try {
                                data = JSON.parse(response.data)
                            } catch (e) {
                                uni.showModal({  //若返回的不是JSON数据，弹框报错并返回
                                    content: "请求失败",
                                    showCancel: false,
                                    success: () => {
                                        uni.navigateBack()
                                    }
                                })
                            }
                            if (data !== {}) {
                                if (data.code == 200) {  //若查询成功，获取文章
                                    this.searchList = data.data.list
                                    this.showList = this.searchList
                                    if (this.lenOfList > this.showList.length) {
                                        this.lenOfList = this.showList.length
                                        this.thereAreMoreArticle = false
                                    }
                                } else {
                                    uni.showModal({
                                        title: "查询失败",
                                        content: data.message,
                                        showCancel: false
                                    })
                                }
                            }
                        } else {
                            uni.showModal({
                                content: "请求失败",
                                showCancel: false
                            })
                        }
                    }
                })
                /* // 尝试模拟搜索返回
                var testStr = '{"code":200,"success":true,"message":"查询成功","data":{"total":1,"list":[{"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}]}}'
                // testStr = '{"code":200,"success":true,"message":"查询成功","data":{"total":12,"list":[]}}'
                this.searchList = JSON.parse(testStr).data.list
                this.showList = this.searchList
                // End of 尝试模拟搜索返回 */
                if (this.lenOfList > this.showList.length) {  //判断是否需要隐藏“加载更多”
                    this.lenOfList = this.showList.length
                    this.thereAreMoreArticle = false
                }
                if (this.showList.length === 0) {  //如果没有找到相应文章，弹框提示并显示所有文章
                    uni.showModal({
                        content: "没有找到相应文章",
                        showCancel: false
                    })
                    this.cancelSearch()
                }
            },
            cancelSearch: function () {  //取消搜索，显示所有文章
                this.showList = this.articleList
                if (this.lenOfList < this.showList.length) {
                    this.lenOfList = 10
                    this.thereAreMoreArticle = true
                }
            }
        },
        created() {
            /* if (typeof XMLHttpRequest != "undifined") {
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
            } */
            uni.request({
                method: "GET",
                url: this.url,
                data: this.userNmuber,
                success: (response) => {
                    if ((response.statusCode>=200 && response.statusCode<300) || response.statusCode==304) {
                        var data = {}
                        try {
                            data = JSON.parse(response.data)
                        } catch (e) {
                            uni.showModal({  //若返回的不是JSON数据，弹框报错并返回
                                content: "请求失败",
                                showCancel: false,
                                success: (res) => {
                                    if (res.confirm) {
                                        uni.navigateBack()
                                    }
                                }
                            })
                        }
                        if (data !== {}) {
                            if (data.code == 200) {  //若响应正常，则获取文章，否则弹框报错并返回
                                this.getArticles(data.data)
                            } else {
                                uni.showModal({
                                    title: "查询失败",
                                    content: data.message,
                                    showCancel: false,
                                    success: function () {
                                        // uni.navigateBack()
                                    }
                                })
                            }
                        }
                    } else {
                        uni.showModal({
                            content: "请求失败",
                            showCancel: false,
                            success: () => {
                                uni.navigateBack()
                            }
                        })
                    }
                }
            })
            //尝试模拟查询返回
            var testStr = '{"code":200,"success":true,"message":"查询成功","data":{"total":12,"list":[{"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1},{"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}, {"article_id": "11111","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站呵呵哈哈哈或或或或或或或或或","article_description": "富力物业华南区域2020届校园招聘广东站全面启动啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所","publish_time": "2019-10-12","article_reader": "11","article_status": 1}, {"article_id": "222222","article_logo": "../../static/logo.png","article_title": "富力物业","article_description": "富力物业","publish_time": "2019-10-13","article_reader": "112","article_status": 1}, {"article_id": "333333","article_logo": "../../static/logo.png","article_title": "富力物业华南区域2020届校园招聘广东站","article_description": "富力物业华南区域2020届校园招聘广东站全面启动","publish_time": "2019-10-124","article_reader": "113","article_status": 1}]}}'
            // testStr = '{"code":200,"success":true,"message":"查询成功","data":{"total":12,"list":[]}}'
            this.getArticles(testStr)
        }
    }
</script>

<style>
    /* @import 'https://fonts.googleapis.com/icon?family=Material+Icons'; */  /*浏览量左边的IconFonts，微信小程序不支持引入CDN的*/
    @import '../../static/IconFont/IconFont.css';  /*浏览量左边的IconFonts*/
    .body {  /*根view*/
        font-size: 16rpx;
        display: flex;
        flex-flow: column nowrap;
    }
    .searchArea {
        /* background-color: #efefef;
        padding: 8rpx 16rpx; */
        border-bottom: 1rpx #dfdfdf solid;
    }
    /* .searchBox {
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
    } */
    .item {  /*文章列表项*/
        border-bottom: 1rpx #dfdfdf solid;
	    line-height: 32rpx;
	    padding: 22upx 30upx;
	    box-sizing: border-box;
	    display: flex;
	    width: 100%;
	    flex-direction: row;
	    font-size: 26upx;
	    flex: 1;
	    justify-content: space-between;
	    align-items: flex-start;
	    overflow: hidden;
	    height: auto;
    }
	.uni-list-cell-hover {
	    background-color: #eee;
	}
    .article_logo {  /*文章图片*/
        flex: 0 1 auto;
        display: inline-block;
        width: 96rpx;
        height: 96rpx;
    }
    .content {  /*标题及摘要区域*/
        flex: 1 1 auto;
        display: inline-block;
        width: 60%;
        margin: 0 24rpx;
    }
    .itemTitle {  /*文章标题*/
	    width: 100%;
	    line-height: 36upx;
	    font-size: 30upx;
	    overflow: hidden;
    }
    .abstract {  /*文章摘要*/
        height: 64rpx;
        overflow: hidden;
        color: #bfbfbf;
        margin-top: 16rpx;
    }
    .info {  /*日期及浏览量区域*/
        flex: 0 0 auto;
        color: #bfbfbf;
        text-align: right;
    }
    .pvIcon {  /*浏览量前的图标，不知道为什么不设font-size的话IconFont会变得很大*/
	    line-height: 30upx;
	    font-size: 26upx;
    }
    .more {  /*“加载更多”*/
        width: 100%;
        font-size: 16rpx;
        text-align: center;
        background-color: #efefef;
        padding: 8rpx;
    }
    .buttom {
        background-color: #007fff;
		height: 100upx;
    }
</style>