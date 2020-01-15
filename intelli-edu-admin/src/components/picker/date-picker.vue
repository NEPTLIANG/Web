<template>
    <!--日期选择器组件-->
    <view class="datePicker">
        <picker mode="date" :value="date" @change="bindDateChange">
            <view>{{date}}</view>
        </picker>
    </view>
</template>

<script>
    export default {
        props: {
            date: {}  //从父组件接收默认值
        },
        data() {
            return {
                //date: "选择日期",
            }
        },
        methods: {
            bindDateChange: function(e) {  //picker组件选项改变事件处理函数
                this.date = e.target.value
                this.$emit('bind-date-change', this.date);  //返回选择的日期给父组件
            },
            /* getDate(type) {  //获取当前日期值，可用于初始化默认值，此处从父组件接收默认值故弃用之
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                month = month>9 ? month : '0'+month;;
                day = day>9 ? day : '0'+day;
                return `${year}-${month}-${day}`;
            } */
        }
    }
</script>

<style>
    .datePicker {
        font-size: 16rpx;
        text-align: center;
        border: 1rpx #bfbfbf solid;
        width: max-content;
        margin: 8rpx 8rpx 16rpx 8rpx;
        padding: 16rpx 16rpx;
    }
</style>
