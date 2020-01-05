<template>
    <view class="body">
        <view class="title">实践经历</view>
        <navigator url="./practical-experience.vue" class="add">添加实践经历</navigator>
        <practical-experience-card
            practice_unit="安吧观光团"
            inauguration_status="兼职"
            entry_name="东风41"
            practice_position="清洁工"
            start_time="2018-01-01"
            end_time="2018-12-31"
            experience_description="呵呵哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或">
        </practical-experience-card>
        <practical-experience-card
            practice_unit="卡吧观光团"
            inauguration_status="全职"
            entry_name="歼20"
            practice_position="保安"
            start_time="2019.02.03"
            end_time="2019.03.04"
            experience_description="啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊">
        </practical-experience-card>
    </view>
</template>

<script>
    import practicalExperienceCard from "@/components/show-card/practical-experience-card";
    export default {
        components: {
            practicalExperienceCard
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
