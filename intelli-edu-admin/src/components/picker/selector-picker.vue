<template>
    <!--默认选择器组件-->
    <view class="selectorPicker">
        <picker @change="bindPickerChange" :value="index" :range="array">
            <view>{{array[index]}}</view>
        </picker>
    </view>
</template>

<script>
    export default {
        props: {
            array: {},  //选项列表
            index: 0  //默认选中的选项下标
        },
        data() {
            return {}
        },
        methods: {
            bindPickerChange: function(e) {  //picker组件选项改变事件处理函数
                this.index = e.target.value
                this.$emit('bind-picker-change', this.array[this.index])  //返回选中的选项值
            }
        }
    }
</script>

<style>
    .selectorPicker {
        text-align: center;
        border: 1rpx #bfbfbf solid;
        /* width: 622rpx; */
        margin: 8rpx 0 16rpx 0;
        padding: 16rpx 16rpx;
    }
</style>
