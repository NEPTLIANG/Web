<template>
    <!--显示单条实践经历页面-->
    <view class="body">
        <view class="title">实践经历</view>
        <view>
            <text class="title">{{practice_unit}} {{practice_position}}</text> <text class="type">{{inauguration_status}}</text>  <!--单位名称 担任职位 就职状态-->
            <view class="time">{{start_time}} - {{end_time}}</view>  <!--开始时间 - 结束时间-->
            <view>项目：{{entry_name}}</view>
            <view class="descript">{{experience_description}}</view>  <!--经历描述-->
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                practice_unit: "准吧观光团",
                inauguration_status: "实习",
                entry_name: "99A",
                practice_position: "斟茶倒水",
                start_time: "1999-1-1",
                end_time: "2000-22-22",
                experience_description: "的点点滴滴多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多"
            }
        }
    }
</script>

<style>
    .body {  /*根view*/
        padding: 32px 32px;
        font-size: 16rpx;
        line-height: 2em;
    }
    .title {
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
</style>
