<template>
    <view class="selectorPicker">
        <picker @change="bindPickerChange" :value="index" :range="array">
            <view>{{array[index]}}</view>
        </picker>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                array: ['全职', '实习', '兼职', '社会实践'],
                index: 0,
            }
        },
        methods: {
            bindPickerChange: function(e) {
                this.index = e.target.value
            },
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
