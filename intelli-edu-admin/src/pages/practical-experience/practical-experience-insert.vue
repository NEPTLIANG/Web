<template>
    <!--添加实践经历页面-->
    <view class="body">
        <form @submit="formSubmit">
            <view class="title">添加实践经历</view>
            <view class="inputTitle">单位名称/公司名称</view>
            <input type="text" name="practiceUnit" placeholder="请输入公司名称" :value="practiceUnit"/>
            <view class="inputTitle">就职状态</view>
            <selector-picker name="inaugurationStatus" :array="['请选择就职状态', '全职', '实习', '兼职', '社会实践']" :index=0 @bind-picker-change="getType"></selector-picker>
            <view class="inputTitle">项目名称</view>
            <input type="text" name="entryName" placeholder="请输入项目名称"/>
            <view class="inputTitle">担任职位</view>
            <input type="text" name="practicePosition" placeholder="请输入职位名称"/>
            <view class="inputTitle">在职时间</view>
            <view style="margin: 0 auto; width: max-content">
                <date-picker name="startTime" date="选择入职时间" @bind-date-change="getStartTime"></date-picker>
                <date-picker name="end_time" date="选择离职时间" style="float: right" @bind-date-change="getEndTime"></date-picker>
            </view>
            <view class="inputTitle">经历描述</view>
            <textarea name="experienceDescription" placeholder="请详细而具体地描述您的职责范围、工作任务以及取得的成绩等。"></textarea>
            <view>
            <!--附件上传部分，之前随便找了个第三方组件，还没来得及针对API进行修改。来源：https://ext.dcloud.net.cn/plugin?id=1136-->
                <view class="inputTitle">附件上传</view>
                <view class="suggest">
                    <view class="computeNum">
                        {{computeLength}}
                    </view> 
                    <view style="padding: 16rpx; margin: 8rpx 0 16rpx 0; border: 1rpx #bfbfbf solid">
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
            <button type="primary" form-type="submit" class="save">添加</button>
            <navigator url="../index/index" class="cancel">取消</navigator>
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
                formdata = `{${formdata},"inauguration_status":"${this.type}","start_time":"${this.startTime}","endTime":"${this.endTime}","enclosureAddress":"${enclosureAddress}","gmtCreate":"${gmtCreate}","gmtModified":"${gmtModified}","userNumber":"${userNumber}","practiceId":"${practiceId}","status":"${status}"}`  //在表单提交的数据后拼接上缺少的数据
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
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(formdata)
                } else {
                    console.log("该浏览器可能不支持AJAX")
                }
            },
            fillIn: function(contentStr) {  //把查询实践经历单条记录返回的内容填到表单里
                var record
                try {
                    record = JSON.parse(contentStr)
                } catch (e) {}
                if (typeof record != "undefined") {
                    record = record.data.practice
                    this.practiceUnit = record.practiceUnit
                }
            },
            getType: function(type) {  //接收普通选择器组件返回的实践经历类型
                this.type = type
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
    .body {  /*根view*/
        padding: 32px 32px;
        font-size: 16rpx;
        line-height: 2em;
    }
    input {
        font-size: 16rpx;
        border: 1rpx #bfbfbf solid;
        margin: 8px 0 16rpx 0;
        padding: 16rpx;
    }
    .title {  /*主标题*/
        font-weight: bold;
    }    
    .datePicker {  /*日期选择器组件*/
        width: 285rpx;
        float: left;
    }
    textarea {
        font-size: 16rpx;
        width: auto;
        border: 1rpx #bfbfbf solid;
        margin: 8px 0 16rpx 0;
        padding: 16rpx;
    }
    .save {  /*保存按钮*/
        font-size: 16rpx;
        width: max-content;
        margin: 16rpx 0;
        padding: 16rpx 32rpx;
        border-radius: 0;
        float: left;
    }
    .cancel {  /*取消按钮（链接）*/
        font-size: 16rpx;
        width: max-content;
        margin: 16rpx;
        padding: 16rpx 32rpx;
        float: left;
    }
</style>
