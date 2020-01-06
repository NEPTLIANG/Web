<template>
    <view class="card">
        <view class="content">
            <text class="title">{{practice_unit}} {{practice_position}}</text> <text class="type">{{inauguration_status}}</text>
            <view class="time">{{start_time}} - {{end_time}}</view>
            <view>项目：{{entry_name}}</view>
            <view class="descript">{{experience_description}}</view>
        </view>
        <!-- <button class="hide">隐藏</button> -->
        <!-- <navigator class="edit" url="./practical-experience">编辑</navigator> -->
    </view>
</template>

<script>
    export default {
        props: {
            practice_unit: {},
            inauguration_status: {},
            entry_name: {},
            practice_position: {},
            start_time: {},
            end_time: {},
            experience_description: {}
        },
        data() {
            return {
                practice_unit: "单位名称",
                inauguration_status: "就职状态",
                entry_name: "项目名称",
                practice_position: "担任职位",
                start_time: "入职时间",
                end_time: "离职时间",
                experience_description: "经历描述"
            }
        }
    }
</script>

<style>
    .card {
        font-size: 16rpx;
        line-height: 2em;
        border: 1rpx #dfdfdf solid;
        margin: 16px 0;
    }
    .content {
        margin: 32px;
    }
    .title {
        font-weight: bold;
    }
    .type {
        font-size: 14rpx;
        line-height: 32rpx;
        color: #007fff;
        background-color: #dfffff;
        margin: 0 8px;
    }
    .time {
        color: #7f7f7f;
    }
    .descript {
        margin: 8px 0 16px 0;
    }
    .hide {
        font-size: 16rpx;
        float: left;
        display: inline-block;
        text-align: center;
        line-height: 64rpx;
        color: #7f7f7f;
        width: 50%;
        height: 64rpx;
        border-width: 0rpx;
        border-radius: 0rpx;
        /* padding: 16px; */
    }
    .edit {
        /* float: right; */
        display: inline-block;
        text-align: center;
        line-height: 64rpx;
        color: #ffffff;
        background-color: #007fff;
        width: 100%;
        height: 64rpx;
        border-width: 0rpx;
        border-radius: 0rpx;
        /* padding: 16px; */
    }
</style>
