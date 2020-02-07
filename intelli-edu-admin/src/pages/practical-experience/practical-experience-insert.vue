<template>
    <!--添加实践经历页面-->
    <view class="body">
        <form @submit="formSubmit" @reset="cancel">
            <view class="title">添加实践经历</view>
            <view class="inputTitle">单位名称/公司名称<text class="red">*</text></view>
            <input type="text" name="practiceUnit" placeholder="请输入公司名称" :value="practiceUnit"/>
            <view class="inputTitle">就职状态<text class="red">*</text></view>
            <selector-picker name="inaugurationStatus" :array="arrayOfType" :index="indexOfType" @bind-picker-change="getType" class="selectorPicker"></selector-picker>
            <view class="inputTitle">项目名称<text class="red">*</text></view>
            <input type="text" name="entryName" placeholder="请输入项目名称"/>
            <view class="inputTitle">担任职位<text class="red">*</text></view>
            <input type="text" name="practicePosition" placeholder="请输入职位名称"/>
            <view class="inputTitle">在职时间<text class="red">*</text></view>
            <view style="margin: 0 auto; width: max-content">
                <date-picker name="startTime" :date="startTime" @bind-date-change="getStartTime"></date-picker>
                <date-picker name="end_time" :date="endTime" style="float: right" @bind-date-change="getEndTime"></date-picker>
            </view>
            <view class="inputTitle">经历描述<text class="red">*</text></view>
            <textarea name="experienceDescription" placeholder="请详细而具体地描述您的职责范围、工作任务以及取得的成绩等。"></textarea>
            <view>
            <!--附件上传部分，之前随便找了个第三方组件，还没来得及针对API进行修改。来源：https://ext.dcloud.net.cn/plugin?id=1136-->
                <view class="inputTitle">附件上传<text class="red">*</text></view>
                <view class="suggest">
                    <view class="computeNum">
                        {{computeLength}}
                    </view> 
                    <view style="padding: 16rpx; margin: 20rpx 0; border: none; border:2upx solid #eee; border-top-width: 4upx; border-radius: 8upx; padding-top: 8upx; outline:medium;   /*输入时去掉边框*/">
                        <uImg  ref="upimg"
                            :canUploadFile="true" 
                            :limit="limitNum"
                            :uploadFileUrl="uploadFileUrl" 
                            :heaer="header" 
                            :fileKeyName="name"
                            :uImgList.sync="uImgList" 
                            @uploadSuccess="uploadSuccess"></uImg>
                    </view>
                </view>
                <button @click="upFile" style="border-radius: 0rpx">上传</button> 
            </view>
            <button form-type="reset" class="cancel">取消</button>
			<view class="one">
				<view class="button-box">
					<button form-type="submit" class="save">添加</button>
				</view>
			</view>
        </form>
    </view>
</template>

<script>
    import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';  //实现附件上传的第三方组件
    import datePicker from "@/components/picker/date-picker.vue";  //日期选择器组件
    import selectorPicker from "@/components/picker/selector-picker.vue";  //普通选择器组件
    export default {
        components: {
            uImg,
            datePicker,  //注册组件
            selectorPicker,
            uImgList: ['/static/logo.png']
        },
        data() {
            return {
                practiceUnit: "",
                url: `${getApp().globalData.url}/practice`,  //添加实践经历的URL
                type: "请选择就职状态",
				arrayOfType: ['请选择就职状态', '全职', '实习', '兼职', '社会实践'],
				indexOfType: 0,
                startTime: "选择入职时间",
                endTime: "选择离职时间",
                //以下是附件上传组件的变量
                computeLength: "",
                msg:'',
                limitNum:6,
                uploadFileUrl: '', //替换成后端接收文件地址
                name:'', //上传的名字
                header: {// 如果需要header，请上传
                },
                uImgList: ['/static/logo.png']
            }
        },
        methods: {
            formSubmit(e) {  //表单提交事件处理函数
                const date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth()+1
                let day = date.getDate()
                month = month>9 ? month : '0'+month
                day = day>9 ? day : '0'+day
                var gmtCreate = `${year}-${month}-${day}`  //获取当前日期作为“记录创建时间”
                var gmtModified = ""  //获取记录更新时间
                var enclosureAddress = ""  //获取附件地址
                var userNumber = ""  //获取学号或工号
                var practiceId = ""  //生成实践经历id
                var status = 2  //设置状态为“未审核”
                var formdata = JSON.stringify(e.detail.value)
                formdata = formdata.substr(1, formdata.length-2)
                formdata = `{${formdata},"inauguration_status":"${this.arrayOfType[this.indexOfType]}","start_time":"${this.startTime}","endTime":"${this.endTime}","enclosureAddress":"${enclosureAddress}","gmtCreate":"${gmtCreate}","gmtModified":"${gmtModified}","userNumber":"${userNumber}","practiceId":"${practiceId}","status":"${status}"}`  //在表单提交的数据后拼接上缺少的数据
                console.log(formdata)  //调试用
                /* uni.showModal({  //调试用的弹框
                     content: '表单数据内容' + JSON.stringify(formdata),
                     showCancel: false
                }); */
                if (typeof XMLHttpRequest != "undifined") {  //发送数据
                    var url = this.url
                    var request = new XMLHttpRequest()
                    request.open("post", url, true)
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304)
                            {
                                var responseObj = JSON.parse(request.responseText)
                                uni.showModal({
                                    content: responseObj.message
                                })
                            } else {
                                uni.showModal({
                                    content: "请求失败"
                                })
                            }
                        }
                    }
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(formdata)
                } else if (typeof ActiveXObject != "undifined") {
                    var url = this.url
                    var request = new ActiveXObject("MSXML2.XMLHttp")
                    request.open("post", url, true)
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304)
                            {
                                var responseObj = JSON.parse(request.responseText)
                                uni.showModal({
                                    content: responseObj.message
                                })
                            } else {
                                uni.showModal({
                                    content: "请求失败"
                                })
                            }
                        }
                    }
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(formdata)
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
            },
			cancel: function () {
				uni.showModal({
					title: "确定要取消并返回？",
					content: "填写的所有内容都将丢失",
					success: function (res) {
						if (res.confirm) {
							uni.navigateBack()
						}
					}
				})
			},
            fillIn: function (contentStr) {  //把查询实践经历单条记录返回的内容填到表单里
                var record
                try {
                    record = JSON.parse(contentStr)
                } catch (e) {}
                if (typeof record != "undefined") {
                    record = record.data.practice
                    this.practiceUnit = record.practiceUnit
                }
            },
            getType: function(indexOfType) {  //接收普通选择器组件返回的实践经历类型
                this.indexOfType = indexOfType
				console.log(this.indexOfType)
            },
            getStartTime: function(time) {  //接收时间选择器组件返回的实践开始时间
                this.startTime = time
            },
            getEndTime: function(time) {  //接收时间选择器组件返回的实践结束时间
                this.endTime = time
            },
            uploadSuccess(result) {  //文件上传组件的上传方法，未实现
                if(result.statusCode == 200) {
                    //上传成功的回调处理
                    toast('上传成功')
                }else{
                    toast('上传失败')
                }
            },
            upFile(){  //文件上传组件的方法
                this.$refs.upimg.upload()
            }
        } /* ,
        onLoad: function (option) {
            var id = option.id
            if (typeof id != "undifined") {
                var url = getApp().globalData.url + "/practice/" + id
                if (typeof XMLHttpRequest != "undifined") {
                    var request = new XMLHttpRequest()
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304) {
                                var response = JSON.parse(request.responseText)
                                if (response.code == 200) {
                                    fillIn(request.responseText)
                                } else {
                                    uni.showModal({
                                        title: "查询失败",
                                        content: response.message,
                                        showCancel: false
                                    })
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
                                        showCancel: false
                                    })
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
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(id)
                } else {
                    uni.showModal({
                        title: "不支持的浏览器",
                        content: "请更换浏览器重试",
                        showCancel: false
                    })
                }
                this.fillIn(request.responseText)
            }
        } */
    }
</script>

<style>
	page{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
	}
    .body {  /*根view*/
		flex: 1;
		padding: 30upx;
    }
    input {
		margin-top: 20upx;
		height: 60upx;
		border: none;
		border:2upx solid #eee;
		border-top-width: 4upx;
		border-radius: 8upx;
		outline:medium;   /*输入时去掉边框*/
    }
	text{
		color: red;
		padding-left: 20upx;
	}
    .title {  /*主标题*/
		padding-top: 30upx;
		font-size: 35upx;
		font-weight: 600;
    }
	.inputTitle{
		padding-top: 30upx;
	}
    .datePicker {  /*日期选择器组件*/
		text-align: left;
        width: 241rpx;
        float: left;
		background-image: url(../../static/时间.png);/*设置小图标*/
		background-size: 40upx 40upx;/*小图标的大小*/
		background-position: 4upx 8upx;/*小图标在input的位置*/	
		background-repeat: no-repeat;/*背景小图标不重复*/	
		margin-top: 20upx;
		height: 58upx;
		border: none;
		border:2upx solid #eee;
		border-top-width: 4upx;
		border-radius: 8upx;
		padding-left: 60upx;
		padding-top: 8upx;
		/* width: 630upx; */
		outline:medium;   /*输入时去掉边框*/
    }
	.selectorPicker {
		text-align: left;
		margin-top: 20upx;
		height: 58upx;
		border: none;
		border:2upx solid #eee;
		border-top-width: 4upx;
		border-radius: 8upx;
		padding-top: 8upx;
		outline:medium;   /*输入时去掉边框*/
	}
    textarea {
		margin-top: 20upx;
		/* margin-bottom: 20upx; */
		border: none;
		border:2upx solid #eee;
		border-top-width: 4upx;
		border-radius: 8upx;
		height: 200upx;
		outline:medium;  
    }
	.one{
		display: flex;
		flex-direction: row-reverse;
	}
	.button-box{
		flex-direction: row-reverse;
		margin-top: 30upx;
		width: 180upx;
		height: 50upx;
	}
    .save {  /*保存按钮*/
		text-decoration:none;
		border:none;
		font-size:28upx;
		font-weight:500;
		border-radius:6upx;
		color: #f2f2f2;
		background-color:#169BD5;
    }
    .cancel {  /*取消按钮*/
        float: left;
		/* height: 50rpx; */
		color: #7f7f7f;
        font-size: 20rpx;
		font-weight: lighter;
        width: max-content;
        margin-top: 30rpx;
        padding: 12rpx 32rpx;
		border-radius: 6rpx;
    }
</style>
