<template>
    <view class="body">
        <form @submit="formSubmit" @reset="formReset">
            <view class="title">添加实践经历</view>
            <view class="inputTitle">单位名称/公司名称</view>
            <input type="text" name="practice_unit" placeholder="请输入公司名称"/>
            <view class="inputTitle">就职状态</view>
            <selector-picker name="inauguration_status" :array="['请选择就职状态', '全职', '实习', '兼职', '社会实践']" :index=0 @bind-picker-change="getType"></selector-picker>
            <view class="inputTitle">项目名称</view>
            <input type="text" name="entry_name" placeholder="请输入项目名称"/>
            <view class="inputTitle">担任职位</view>
            <input type="text" name="practice_position" placeholder="请输入职位名称"/>
            <view class="inputTitle">在职时间</view>
            <view style="margin: 0 auto; width: max-content">
                <date-picker name="start_time" date="选择入职时间" @bind-date-change="getStartTime"></date-picker>
                <date-picker name="end_time" date="选择离职时间" style="float: right" @bind-date-change="getEndTime"></date-picker>
            </view>
            <view class="inputTitle">经历描述</view>
            <textarea name="experience_description" placeholder="请详细而具体地描述您的职责范围、工作任务以及取得的成绩等。"></textarea>
            <view>
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
            <button type="primary" form-type="submit" class="save">保存</button>
            <navigator url="../index/index" class="cancel">取消</navigator>
        </form>
    </view>
</template>

<script>
    import uImg from '@/components/zhtx-uploadImg/zhtx-uploadImg.vue';
    import datePicker from "@/components/picker/date-picker.vue";  //导入组件
    import selectorPicker from "@/components/picker/selector-picker.vue";
    export default {
        components: {
            uImg,
            datePicker,  //注册组件
            selectorPicker,
            uImgList: ['/static/logo.png']
        },
        data() {
            return {
                type: "请选择就职状态",
                startTime: "选择入职时间",
                endTime: "选择离职时间",
                msg:'',
                limitNum:6,
                uploadFileUrl: '', //替换成你的后端接收文件地址
                name:'', //上传的名字
                header: {// 如果需要header，请上传
                },
                uImgList: ['/static/logo.png']
            }
        },
        methods: {
            formSubmit(e) {
                var formdata = JSON.stringify(e.detail.value)
                formdata = formdata.substr(1, formdata.length-2)
                formdata = `{${formdata},"inauguration_status":"${this.type}","start_time":"${this.startTime}","end_time":"${this.endTime}"}`
                formdata = JSON.parse(formdata)
                //formdata = `${JSON.stringify(e.detail.value)},"inauguration_status":"${this.type}","start_time":"${this.startTime}","end_time":"${this.endTime}"`
                console.log(formdata)
                // console.log(JSON.stringify(e.detail.value))
                // console.log(this.type)
                // var formdata = e.detail.value
                // uni.showModal({
                //     content: '表单数据内容' + JSON.stringify(formdata),
                //     showCancel: false
                // });
            },
            getType: function(type) {
                this.type = type
                console.log(this.type)
            },
            getStartTime: function(time) {
                this.startTime = time
            },
            getEndTime: function(time) {
                this.endTime = time
            },
            uploadSuccess(result) {
                if(result.statusCode == 200) {
                    //上传成功的回调处理
                    toast('上传成功')
                }else{
                    toast('上传失败')
                }
            },
            //上传方法的调用
            upFile(){
                this.$refs.upimg.upload()
            }
        }
    }
</script>

<style>
    .body {
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
    .title {
        font-weight: bold;
    }    
    .datePicker {
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
    .save {
        font-size: 16rpx;
        width: max-content;
        margin: 16rpx 0;
        padding: 16rpx 32rpx;
        border-radius: 0;
        float: left;
    }
    .cancel {
        font-size: 16rpx;
        width: max-content;
        margin: 16rpx;
        padding: 16rpx 32rpx;
        float: left;
    }
</style>
