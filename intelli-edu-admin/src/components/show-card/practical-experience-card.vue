<template>
    <!--实践经历展示卡片-->
    <view class="card">
        <navigator :url="`./practical-experience-select-single?id=${practice_id}`">  <!--点击内容部分跳转到单条实践经历展示页面-->
            <view class="content">
                <text class="title">{{practice_unit}} {{practice_position}}</text> <text class="type">{{inauguration_status}}</text>  <!--单位名称 担任职位 就职状态-->
                <view class="time">{{start_time}} - {{end_time}}</view>  <!--开始时间 - 结束时间-->
                <view>项目：{{entry_name}}</view>  <!--项目名称-->
                <view class="descript">{{experience_description}}</view>  <!--经历描述-->
            </view>
        </navigator>
        <button class="del" plain @click="$emit('del', practice_id)">删除</button>
        <navigator class="edit" :url="'./practical-experience-alter?id=' + practice_id">编辑</navigator>
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
            experience_description: {},
            practice_id: {}
        } /* ,
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
        } */
    }
</script>

<style>
    .card {
		line-height: 1.75em;
		padding: 30upx;
		background: white;
		margin-top: 30upx;
		font-size: 28upx;
		color: black;
    }
    .content {
        /* margin: 32px; */
    }
    .title {  /*单位名称和担任职位*/
        font-weight: bold;
    }
    .type {  /*就职状态标签*/
        font-size: 24rpx;
        line-height: 28rpx;
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
        float: left;
        /* display: inline-block; */
        width: 50%;
		text-align: left;
		border: rgba(255, 255, 255, 0) 0rpx none;
		background-image: url(../../static/删除.png);/*设置小图标*/
		background-size: 40upx 40upx;/*小图标的大小*/
		background-position: 18% ; /*小图标在input的位置*/	
		background-repeat: no-repeat;/*背景小图标不重复*/	
		border-right: 2upx solid #F8F8F8;
		padding-left: 19%;
		color: #d81e06;
		font-size: 28upx;
    }
    .edit {  /*编辑按钮（链接）*/
        /* float: right; */
        display: inline-block;
        line-height: 64rpx;
		background-image: url(../../static/修改.png);/*设置小图标*/
		background-size: 40upx 40upx;/*小图标的大小*/
		background-position: 18%; /*小图标的位置*/	
		background-repeat: no-repeat;/*背景小图标不重复*/	
		padding-left: 19%;
		width: 25%;
		font-size: 28upx;	
    }
</style>
