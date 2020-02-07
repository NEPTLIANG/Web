<template>
    <!--显示单条实践经历页面-->
    <view class="body">
		<view class="banner">
		    <view class="banner-title">
				<text class="title">{{practice_unit}} {{practice_position}}</text>   <!--单位名称 担任职位-->
			</view>			
			<view class="banner-data"><text class="type">{{inauguration_status}}</text></view>  <!-- 就职状态 -->
		</view>
        <view class="article-meta">
            <view class="time">{{start_time}} - {{end_time}}</view>  <!--开始时间 - 结束时间-->
            <view>项目：{{entry_name}}</view>
        </view>
		<view class="line"></view>
        <view class="descript">{{experience_description}}</view>  <!--经历描述-->
		<view class="button-box"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                url: getApp().globalData.url + "/practice/" + id,
                practice_unit: "",
                inauguration_status: "",
                entry_name: "",
                practice_position: "",
                start_time: "",
                end_time: "",
                experience_description: ""
            }
        },
        methods: {
            fillIn: function(contentStr) {  //把查询实践经历单条记录返回的内容填到表单里
                var record = {}
                try {
                    record = JSON.parse(contentStr)
                } catch (e) {}
                if (typeof record != {}) {
                    record = record.data.practice
                    this.practice_unit = record.practiceUnit
                    this.inauguration_status = record.inaugurationStatus
                    this.entry_name = record.entryName
                    this.practice_position = record.practicePosition
                    this.start_time = record.startTime
                    this.end_time = record.endTime
                    this.experience_description = record.experienceDescription
                }
            }
        },
        onLoad: function (option) {  //加载页面时用上一页面传进来的实践经历id查询实践经历内容
            var id = option.id
            this.practiceId = id
            //console.log(id)
            if (typeof id != "undifined") {
                if (typeof XMLHttpRequest != "undifined") {
                    var request = new XMLHttpRequest()
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304) {
                                var response = {}
                                try {
                                    response = JSON.parse(request.responseText)
                                } catch(e) {  //如果返回的不是JSON数据，弹框报错并返回
                                    uni.showModal({
                                        content: "请求失败",
                                        showCancel: false,
                                        success: function (res) {
                                            if (res.confirm) {
                                                // uni.navigateBack()
                                            }
                                        }
                                    })
                                }
                                if (response.code == 200) {  //如果返回内容的code属性为200，把查询到的内容填到表单中，否则弹框报错并返回
                                    fillIn(request.responseText)
                                } else {
                                    uni.showModal({
                                        title: "查询失败",
                                        content: response.message,
                                        showCancel: false,
                                        success: function () {
                                            // uni.navigateBack()
                                        }
                                    })
                                }
                            } else {
                                uni.showModal({  //若请求失败，弹框报错并返回
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
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(id)
                } else if (typeof ActiveXObject != "undifined") {
                    var request = new ActiveXObject(MSXML2.XMLHttp)
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304) {
                                var response = JSON.parse(request.responseText)
                                if (response.code == 200) {
                                    this.fillIn(request.responseText)
                                } else {
                                    uni.showModal({
                                        title: "查询失败",
                                        content: response.message,
                                        showCancel: false,
                                        success: function (res) {
                                            if (res.confirm) {
                                                uni.navigateBack()
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
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(id)
                } else {
                    uni.showModal({
                        title: "不支持的浏览器",
                        content: "请更换浏览器重试",
                        showCancel: false,
                        success: function () {
                            uni.navigateBack()
                        }
                    })
                }
                var testStr = '{\"code\":200,\"success\":true,\"message\":\"查询成功\",\"data\":{\"practice\":{\"enclosureAddress\":null,\"endTime\":\"2022-03-13\",\"entryName\":\"99A主战坦克\",\"experienceDescription\":\"呵呵哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或\",\"gmtCreate\":null,\"gmtModified\":null,\"inaugurationStatus\":\"全职\",\"practiceId\":null,\"practicePosition\":\"清洁工\",\"practiceUnit\":\"安吧观光团\",\"startTime\":\"2018-01-09\",\"status\": null,\"userNumber\": null}}}'  //先尝试模拟返回JSON字符串
                this.fillIn(testStr)
            }
        }
    }
</script>

<style>
    .body {  /*根view*/
        font-size: 28upx;
        line-height: 1.8;
    }
	.banner {
	    height: 200upx;
	    overflow: hidden;
	    position: relative;
	    background-color: #0faeff;
	}
	.banner-title {
		margin: 64rpx auto 8rpx auto;
	    max-height: 84upx;
		overflow: hidden;
		left: 10%;
		top: 30%;
	    width: 80%;
	    font-size: 32upx;
	    font-weight: 500;
	    line-height: 42upx;
		text-align: center;
	    color: white;
	    z-index: 11;
	}
	.banner-data{
		margin: 0 auto;
		text-align: center;
		overflow: hidden;
		top: 55%;
		left: 35%;
		width: 30%;
		color: white;
	}
    .type {  /*就职状态标签*/
        font-size: 20rpx;
        line-height: 32rpx;
        color: #007fff;
        background-color: #dfffff;
        margin: 0 8rpx;
    }
    .article-meta {
        padding: 20upx 40upx;
		color: gray;
        font-size: 26upx;
        line-height: 50upx;
        margin: 0 20upx;
    }
    .time {  /*开始时间和结束时间*/
        color: #7f7f7f;
    }
	.line{
		border: 1px solid;
	/* 	margin-left: 5%;
		width: 90%; */
		color: #ccc;
	}
    .descript {  /*经历描述*/
        padding: 0 50upx;
        overflow: hidden;
        font-size: 30upx;
        margin-bottom: 30upx;
    }
	.button-box{
		height: 100upx;
		background-color:#0faeff ;
	}
</style>
