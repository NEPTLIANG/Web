<template>
    <view class="datePicker">
        <picker mode="date" :value="date" @change="bindDateChange">
            <view>{{date}}</view>
        </picker>
    </view>
</template>

<script>
    export default {
        props: {
            date: {}
        },
        data() {
            return {
                //date: "选择日期",
            }
        },
        methods: {
            bindDateChange: function(e) {
                this.date = e.target.value
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                month = month>9 ? month : '0'+month;;
                day = day>9 ? day : '0'+day;
                return `${year}-${month}-${day}`;
            }
        }
    }
</script>

<style>
    .datePicker {
        text-align: center;
        border: 1rpx #bfbfbf solid;
        width: max-content;
        margin: 8rpx 8rpx 16rpx 8rpx;
        padding: 16rpx 16rpx;
    }
</style>
