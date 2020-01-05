<template>
    <view class="body">
        <form @submit="formSubmit" @reset="formReset">
            <view class="title">添加实践经历</view>
            <view class="inputTitle">单位名称/公司名称</view>
            <input type="text" name="practice_unit" placeholder="请输入公司名称"/>
            <view class="inputTitle">就职状态</view>
            <selector-picker name="inauguration_status"></selector-picker>
            <view class="inputTitle">项目名称</view>
            <input type="text" name="entry_name" placeholder="请输入项目名称"/>
            <view class="inputTitle">担任职位</view>
            <input type="text" name="practice_position" placeholder="请输入职位名称"/>
            <view class="inputTitle">在职时间</view>
            <view style="margin: 0 auto; width: max-content">
                <date-picker name="start_time" date="选择入职时间"></date-picker>
                <date-picker name="end_time" date="选择离职时间" style="float: right"></date-picker>
            </view>
            <view class="inputTitle">经历描述</view>
            <textarea name="experience_description" placeholder="请详细而具体地描述您的职责范围、工作任务以及取得的成绩等。"></textarea>
            <view class="inputTitle">附件上传</view>
            <!-- <uImg  ref="upimg"
                :canUploadFile="true" 
                :uploadFileUrl="uploadFileUrl" 
                :fileKeyName="name"
                :uImgList.sync="uImgList" 
                @uploadSuccess="uploadSuccess"/>  -->
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
            selectorPicker
        },
        data() {
            return {
            }
        },
        methods: {
            formSubmit: function(e) {
                console.log(JSON.stringify(e.detail.value))
                var formdata = e.detail.value
                uni.showModal({
                    content: '表单数据内容' + JSON.stringify(formdata),
                    showCancel: false
                });
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
        padding: 6rpx;
    }
    .title {
        font-weight: bold;
    }    
    .datePicker {
        width: 285rpx;
        float: left;
    }
    textarea {
        width: auto;
        border: 1rpx #bfbfbf solid;
        margin: 8px 0 16rpx 0;
        padding: 16rpx;
    }
    button {
        width: max-content;
        margin: 16rpx 0;
        padding: 16rpx 32rpx;
        border-radius: 0;
        float: left;
    }
    .cancel {
        width: max-content;
        margin: 16rpx;
        padding: 16rpx 32rpx;
        float: left;
    }
</style>
