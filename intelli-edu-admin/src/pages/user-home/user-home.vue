<template>
    <!--用户主页-->
    <view class="body">
        <view class="head">
            <view v-if="haveLoggedOn" class="haveLoggedOn">  <!--登录后的信息栏-->
                <view class="info">
                    <image :src="portrait" mode="aspectFill" class="portrait">  <!--头像-->
                        <view class="name">{{name}}</view>  <!--用户名-->
                        <view>
                            <view><!-- <text class="iconFonts material-icons">&#xe80c;</text> -->{{school}}</view>  <!--学校-->
                            <view><!-- <text class="iconFonts material-icons">&#xe0cf;</text> -->{{tel}}</view>  <!--电话-->
                        </view>
                    <view @click="logout" class="logout">退出登录</view>
                </view>
                <navigator url="../index/index" class="infoDetails material-icons">&#xe315;</navigator>  <!--右边那个右箭头（个人信息）-->
            </view>
            <view v-if="!haveLoggedOn" class="haveNotLoggedOn">  <!--登录前的信息栏-->
                <view class="haveNotLoggedOnHint">你还没有登录哦~</view>
                <navigator url="../index/index" class="logout">马上登录</navigator>
            </view>
        </view>
        <view v-if="haveLoggedOn" class="menu">  <!--菜单区域-->
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
                url: `${getApp().globalData.url}/studentinfo/${this.id}`,
                id: "",
                portrait: "../../static/logo.png",
                haveLoggedOn: false,
                name: "黄仁勋",
                school: "寸金路职业技术学校",
                tel: "12580",
                mainOptions: [{
                    "name": "成绩查询",
                    "url": "../index/index",
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
        },
        methods: {
            logout: function () {
                this.haveLoggedOn = false
                if (this.haveLoggedOn === false) {
                    uni.showModal({
                        content: "退出成功",
                        showCancel: false
                    })
                }
            }
        },
        created() {
            this.haveLoggedOn = true
            uni.request({
                method: "GET",
                url: this.url,
                data: this.id,
                success: function (response) {
                    if ((response.statusCode>=200 && response.statusCode<300) || response.statusCode==304) {
                        if (response.data.code == 200) {
                            this.school = response.data.data.studentInfo.studentSchool
                        } else {
                            uni.showModal({
                                content: "查询失败",
                                showCancel: false,
                                success: (res) => {
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
                            success: () => {
                                uni.navigateBack()
                            }
                        })
                    }
                }
            })
            uni.request({
                method: "GET",
                url: `${getApp().globalData.url}/user/${this.id}`,
                data: this.id,
                success: function (response) {
                    if ((response.statusCode>=200 && response.statusCode<300) || response.statusCode==304) {
                        if (response.data.code == 200) {
                            this.name = response.data.user.realName
                            this.tel = response.data.user.userTel
                        } else {
                            uni.showModal({
                                title: "查询失败",
                                content: response.data.message,
                                showCancel: false,
                                success: () => {
                                    // uni.navigateBack()
                                }
                            })
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
            //尝试模拟请求返回
            var responseText = '{"code":200,"success":true,"message":"查询成功","data":{"studentInfo":{"studentInfoId":1,"userNumber":"2000324129","studentSex":"","studentClass":"16计本班","studentMajor":"","studentBirthday":"","studentSchool":"岭师附中附属学校","Years":"","studentPolitic":"","studentJiguan":"","studentAddress":"","studentPostalCode":"","studentWechat":"","studentQq":"","studentColleges":"","studentIdcard":"","studentSchool":"岭师附中附属学校","studentBiogenicLand":"","studentNowResidence":"","studentParentTel":"","studentTeacherCategory":"","studentDisability":"","studentDifficulties":"","status":null,"gmtModified":null,"gmtCreate":"2020-01-08 01:05:00"}}}'
            var response = JSON.parse(responseText)
            this.school = response.data.studentInfo.studentSchool
            responseText = '{"code":200,"success":true,"message":"查询成功","data":{"user":{"userId":1,"userNumber":"root","realName":"梁图样","password":"111898061e29f6b205d6264778b32e19","openid":null,"loginRandom":null,"userEmail":null,"userTel":"8208208820","loginTime":null,"loginIp":null,"gmtModified":null,"gmtCreate":"2019-11-19 21:01:47"}}}'
            var response = JSON.parse(responseText)
            this.name = response.data.user.realName
            this.tel = response.data.user.userTel
        }
    }
</script>

<style>
    /*@import 'https://fonts.googleapis.com/icon?family=Material+Icons';*/  /*学校前面、电话前面、右边的IconFonts*/
    @import '../../static/IconFont/IconFont.css';
    .body {  /*根view*/
        display: flex;
        flex-direction: column;
        /* font-size: 16rpx;
        line-height: 2em; */
        background-color: #efefef;
    }
    .head {  /*用户信息区域*/
        display: flex;
        background-color: #00afff;
		padding: 30upx 30upx;
		color: #FFFFFF;
		font-size: 30upx;
    }
    .haveLoggedOn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .portrait {
        height: 50upx; 
        width: 50upx;
        border-radius: 128rpx;
    }
    .info {
        flex: 0 1 auto;
        /* display: inline-block; */
        /* margin-left: 32rpx;
        vertical-align: top; */
    }
    /* .name {
        font-size: 24rpx;
    } */
    .iconFonts {  /*学校前面、电话前面的图标*/
        font-size: 16rpx;
        line-height: 2em;
        margin-right: 8rpx;
    }
    .logout {  /*“退出登录”按钮*/
        /* float: right;
        font-size: 20rpx; */
        width: fit-content;
        margin: 8rpx 0 0 0;
        padding: 2rpx 16rpx;
        border: 3rpx #fff solid;
        border-radius: 8px;
    }
    .infoDetails {  /*右边的右箭头（个人信息）*/
        /* float: right; */
        font-size: 48rpx;
        /* line-height: 128rpx;
        height: 128rpx; */
        margin-left: 16rpx;
    }
    .card {
        background-color: #fff;
        margin: 20rpx 0;
    }
    .subTitle {
        /* font-size: 20rpx; */
        /* padding: 8rpx 12rpx; */
        border-left: 10rpx #00afff solid;
		height: 70rpx;
		padding-left: 3%;
		line-height: 70rpx;
		font-size: 35rpx;
    }
    .option {
        display: inline-block;
        text-align: center;
        /* width: 86rpx; */
        /* padding: 32rpx; */
        margin-top: 10rpx;
		width: 20%;
		height: 140rpx;
		background-color:#FFFFFF;
		font-size: 22rpx;
    }
    .optionImg {
        /* width: 86rpx;
        height: 86rpx;
        margin: 0 auto; */

		width: 80rpx;
		height: 80rpx;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10rpx;
    }
    .buttom {
        background-color: #007fff;
        height: 128rpx;
    }
    .haveNotLoggedOnHint {
        font-size: 32rpx;
    }
</style>
