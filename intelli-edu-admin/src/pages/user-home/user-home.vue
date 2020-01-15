<template>
    <!--用户主页-->
    <view class="body">
        <view class="head">
            <image src="../../static/logo.png" mode="aspectFill" class="portrait">  <!--头像-->
            <view class="info">
                <view class="name">{{name}}</view>  <!--用户名-->
                <view>
                    <view><text class="iconFonts material-icons">&#xe80c;</text>{{school}}</view>  <!--学校-->
                    <view><text class="iconFonts material-icons">&#xe0cf;</text>{{tel}}</view>  <!--电话-->
                </view>
            </view>
            <navigator url="../practical-experience/practical-experience-show" class="infoDetails material-icons">&#xe315;</navigator>  <!--右边那个右箭头（个人信息）-->
            <view class="logout">退出登录</view>
        </view>
        <view class="menu">  <!--菜单区域-->
            <view class="card">
                <view v-for="option in mainOptions" :key="option.name" class="option">
                    <navigator :url="option.url">
                        <image :src="option.img" mode="aspectFill" class="optionImg">
                        <view>{{option.name}}</view>
                    </navigator>
                </view>
            </view>
            <view class="card">
                <view class="subTitle">学在信息</view>
                <view v-for="option in onlineOptions" :key="option.name" class="option">
                    <navigator :url="option.url">
                        <image :src="option.img" mode="aspectFill" class="optionImg">
                        <view>{{option.name}}</view>
                    </navigator>
                </view>
            </view>
            <view class="card">
                <view class="subTitle">个人中心</view>
                <view v-for="option in personalOptions" :key="option.name" class="option">
                    <navigator :url="option.url">
                        <image :src="option.img" mode="aspectFill" class="optionImg">
                        <view>{{option.name}}</view>
                    </navigator>
                </view>
            </view>
            <view class="card">
                <view class="subTitle">就业服务</view>
                <view v-for="option in obtainOptions" :key="option.name" class="option">
                    <navigator :url="option.url">
                        <image :src="option.img" mode="aspectFill" class="optionImg">
                        <view>{{option.name}}</view>
                    </navigator>
                </view>
            </view>
        </view>
        <view class="buttom"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                "name": "黄仁勋",
                "school": "岭师附中附属学校",
                "tel": "12580",
                "mainOptions": [{
                    "name": "成绩查询",
                    "url": "../practical-experience/practical-experience-show",
                    "img": "../../static/logo.png"
                }, {
                    "name": "课表查询",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "活动签到",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "请假申请",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "消息提醒",
                    "url": "",
                    "img": "../../static/logo.png"
                }],
                "onlineOptions": [{  //“学在信息”菜单选项
                    "name": "学习在线",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "创新创业",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "IT文化节",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "综测评比",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "图书查询",
                    "url": "",
                    "img": "../../static/logo.png"
                }],
                "personalOptions": [{  //“个人中心”菜单选项
                    "name": "个人信息",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "信息填报",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "考取证书",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "实践经历",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "获奖经历",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "干部经历",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "我的简历",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "我的收藏",
                    "url": "",
                    "img": "../../static/logo.png"
                }],
                "obtainOptions": [{  //“就业服务”菜单选项
                    "name": "招聘公告",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "相关政策",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "职业规划",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "就业手续",
                    "url": "",
                    "img": "../../static/logo.png"
                }, {
                    "name": "在线问答",
                    "url": "",
                    "img": "../../static/logo.png"
                }]
            }
        }
    }
</script>

<style>
    @import 'https://fonts.googleapis.com/icon?family=Material+Icons';  //学校前面、电话前面、右边的IconFonts
    .body {  /*根view*/
        font-size: 16rpx;
        line-height: 2em;
        background-color: #efefef;
    }
    .head {  /*用户信息区域*/
        color: #fff;
        background-color: #007fff;
        padding: 32rpx;
    }
    .portrait {
        display: inline-block;
        height: 128rpx;
        width: 128rpx;
        border-radius: 128rpx;
    }
    .info {
        display: inline-block;
        margin-left: 32rpx;
        vertical-align: top;
    }
    .name {  /*用户名*/
        font-size: 24rpx;
    }
    .iconFonts {  /*学校前面、电话前面的图标*/
        font-size: 16rpx;
        line-height: 2em;
        margin-right: 8rpx;
    }
    .logout {  /*“退出登录”按钮*/
        float: right;
        font-size: 20rpx;
        padding: 8rpx 16rpx;
        border: 3rpx #fff solid;
        border-radius: 8px;
    }
    .infoDetails {  /*右边的右箭头（个人信息）*/
        float: right;
        font-size: 36rpx;
        line-height: 128rpx;
        height: 128rpx;
        margin-left: 16rpx;
    }
    .card {
        background-color: #fff;
        margin: 16rpx 0;
    }
    .subTitle {
        font-size: 20rpx;
        padding: 8rpx 12rpx;
        border-left: 4px #007fff solid;
    }
    .option {
        display: inline-block;
        text-align: center;
        width: 86rpx;
        padding: 32rpx;
    }
    .optionImg {
        width: 86rpx;
        height: 86rpx;
        margin: 0 auto;
    }
    .buttom {
        background-color: #007fff;
        height: 128rpx;
    }
</style>
