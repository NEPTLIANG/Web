<template>
    <view class="body">
        <view class="title">实践经历</view>
        <navigator url="./practical-experience" class="add">添加实践经历</navigator>
        <!-- <practical-experience-card
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
        </practical-experience-card>  -->
        <practical-experience-card v-for="item in cardList" :key="item.id"
            :practice_unit="item.practice_unit"
            :inauguration_status="item.inauguration_status"
            :entry_name="item.entry_name"
            :practice_position="item.practice_position"
            :start_time="item.start_time"
            :end_time="item.end_time"
            :experience_description="item.experience_description">
        </practical-experience-card>
    </view>
</template>

<script>
    import practicalExperienceCard from "@/components/show-card/practical-experience-card";
    export default {
        components: {
            practicalExperienceCard
        },
        data() {
            return {
                cardList: []
            }
        },
        created () {
            //console.log(1)
            this.cardList= [{
                practice_unit: "图吧观光团",
                inauguration_status: "实习",
                entry_name: "轰20",
                practice_position: "拧螺丝",
                start_time: "2018-01-40",
                end_time: "2018-12-50",
                experience_description: "少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所"
            }, {
                practice_unit: "笔吧观光团",
                inauguration_status: "社会实践",
                entry_name: "辽宁舰",
                practice_position: "码农",
                start_time: "2018-01-01",
                end_time: "2018-12-31",
                experience_description: "的点点滴滴多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多"
            }]
        },
        methods: {}
    }
</script>

<style>
    .body {
        padding: 32px 32px;
        font-size: 16rpx;
        line-height: 2em;
    }
    .title {
        font-weight: bold;
    }
    .add {
        text-align: center;
        color: #ffffff;
        background-color: #007fff;
        padding: 16px;
        margin: 8px 0 16px 0;
    }
</style>
