<template>
    <view class="selectorPicker">
        <picker @change="bindPickerChange" :value="index" :range="array">
            <view>{{array[index]}}</view>
        </picker>
    </view>
</template>

<script>
    export default {
        props: {
            array: {},
            index: 0
        },
        data() {
            return {}
        },
        methods: {
            bindPickerChange: function(e) {
                this.index = e.target.value
                this.$emit('bind-picker-change', this.array[this.index])
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
