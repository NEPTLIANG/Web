<template>
    <!--实践经历展示卡片-->
    <view class="card">
        <view class="content">
            <text class="title">{{practice_unit}} {{practice_position}}</text> <text class="type">{{inauguration_status}}</text>  <!--单位名称 担任职位 就职状态-->
            <view class="time">{{start_time}} - {{end_time}}</view>  <!--开始时间 - 结束时间-->
            <view>项目：{{entry_name}}</view>  <!--项目名称-->
            <view class="descript">{{experience_description}}</view>  <!--经历描述-->
        </view>
        <button class="del" @click="$emit('del')">删除</button>
        <navigator class="edit" url="./practical-experience">编辑</navigator>
    </view>
</template>

<script>
    export default {
        props: {  //从父组件接收要显示的内容
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
    .title {  /*单位名称和担任职位*/
        font-weight: bold;
    }
    .type {  /*就职状态标签*/
        font-size: 14rpx;
        line-height: 32rpx;
        color: #007fff;
        background-color: #dfffff;
        margin: 0 8px;
    }
    .time {  /*开始时间和结束时间*/
        color: #7f7f7f;
    }
    .descript {  /*经历描述*/
        margin: 8px 0 16px 0;
    }
    .del {  /*删除按钮*/
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
    .edit {  /*编辑按钮（链接）*/
        /* float: right; */
        display: inline-block;
        text-align: center;
        line-height: 64rpx;
        color: #ffffff;
        background-color: #007fff;
        width: 50%;
        height: 64rpx;
        border-width: 0rpx;
        border-radius: 0rpx;
        /* padding: 16px; */
    }
</style>
