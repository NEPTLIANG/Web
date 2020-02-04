<template>
    <!--显示所有实践经历页面-->
    <view class="body">
        <view class="title">实践经历</view>
        <navigator url="./practical-experience-insert" class="add">添加实践经历</navigator>
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
            :experience_description="item.experience_description"
            :practice_id="item.practice_id"
            @del="del">  <!--实践经历列表，参数分别为：单位名称，就职状态，项目名称，担任职位，开始时间，结束时间，经历描述-->
        </practical-experience-card>
    </view>
</template>

<script>
    import practicalExperienceCard from "@/components/show-card/practical-experience-card";  //展示单条实践经历的卡片组件
    export default {
        components: {
            practicalExperienceCard
        },
        data() {
            return {
                url: getApp().globalData.url + "/practice",
                cardList: []  //描述实践经历的对象数组
            }
        },
        methods: {
            responseProcess: function(jsonStr) {  //接收到服务端返回的数据后进行的处理
                var jsonObj = JSON.parse(jsonStr)
                for (var index in jsonObj.data.list) {
                    var item = jsonObj.data.list[index]
                    var card = {
                        practice_unit: item.practiceUnit,
                        inauguration_status: item.inaugurationStatus,
                        entry_name: item.entryName,
                        practice_position: item.practicePosition,
                        start_time: item.startTime,
                        end_time: item.endTime,
                        experience_description: item.experienceDescription,
                        practice_id: item.practiceId
                    }
                    this.cardList.push(card)  //把处理得到的实践经历对象添加到数组里
                }
            },
            del: function(id) {  //删除实践经历
                var url = getApp().globalData.url + "/practice/" + id
                if (typeof XMLHttpRequest != "undifined") {
                    var request = new XMLHttpRequest()
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304) {
                                var response = JSON.parse(request.responseText)
                                uni.showModal({
                                    content: response.message,
                                    showCancel: false
                                })
                                if (response.success === true) {  //若返回删除成功，则移除界面中被删除的实践经历
                                    for (var index in this.cardList) {
                                        if (this.cardList[index].practice_id == id) {
                                            this.cardList.splice(index, 1)
                                        }
                                    }
                                }
                            } else {
                                uni.showModal({
                                    content: "请求失败",
                                    showCancel: false
                                })
                            }
                        }
                    }
                    request.open("DELETE", url, true)
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(id)
                } else if (typeof ActiveXObject != "undifined") {
                    var request = new ActiveXObject("MSXML2.XMLHttp")
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if ((request.status>=200 && request.status<300) || request.status==304) {
                                var response = JSON.parse(request.responseText)
                                uni.showModal({
                                    content: response.message,
                                    showCancel: false
                                })
                            } else {
                                uni.showModel({
                                    content: "请求失败",
                                    showCancel: false
                                })
                            }
                        }
                    }
                    request.open("DELETE", url, true)
                    request.setRequestHeader("Authorization", "Bearer token")
                    request.send(id)
                } else {
                    uni.showModel({
                        title: "请更换浏览器重试",
                        content: "不支持的浏览器",
                        showCancel: false
                    })
                }
            }
        },
        created() {  //在实例创建完成后请求数据
            this.cardList= [{  //调试用的数据
                practice_unit: "图吧观光团",
                inauguration_status: "实习",
                entry_name: "轰20",
                practice_position: "拧螺丝",
                start_time: "2018-01-40",
                end_time: "2018-12-50",
                experience_description: "少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所",
                practice_id: "11111"
            }, {
                practice_unit: "笔吧观光团",
                inauguration_status: "社会实践",
                entry_name: "辽宁舰",
                practice_position: "码农",
                start_time: "2018-01-01",
                end_time: "2018-12-31",
                experience_description: "的点点滴滴多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多",
                practice_id: "22222"
            }]
            var userNumber = ""
            if (typeof XMLHttpRequest != "undifined") {
                // url = "https://result.eolinker.com/3vdj9Pjeb63dee50c2fac316a7a41ccffd1a3e7910ba8e7?uri=/practice"  //尝试使用Eolinker的示例调用地址
                var request = new XMLHttpRequest()
                var response = ""
                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        if ((request.status>=200 && request.status<300) || request.statuse==304) {
                            response = request.resopnseText
                            //console.log(request.resopnseText)
                        } else {
                            uni.showModal({
                                content: "请求失败",
                                showCancel: false
                            })
                        }
                    }
                }
                if (response != "") {
                    this.responseProcess(request.responseText)  //调用前面写的响应处理函数
                }
                request.open("post", this.url, true)
                request.send(userNumber)
            } else if (typeof ActiveXObject != "undifined") {
                url = "https://result.eolinker.com/3vdj9Pjeb63dee50c2fac316a7a41ccffd1a3e7910ba8e7?uri=/practice"  //尝试使用Eolinker的示例调用地址
                var request = new ActiveXObject("MSMXL2.XMLHttp")
                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        if ((request.statuscode>=200 && request.statuscode<300) || request.statuscode==304) {
                            response = request.rsesopnseText
                            //console.log(request.respondseText)
                        } else {
                            uni.showModal({
                                content: "请求失败",
                                title: request.status,
                                showCancel: false
                            })
                        }
                    }
                }
                if (response != "") {
                    this.responseProcess(request.responseText)  //调用前面写的响应处理函数
                }
                request.open("post", this.url, ture)
                request.send(userNumber)
            } else {
                uni.showModal({
                    title: "请更换浏览器重试",
                    content: "不支持的浏览器",
                    showCancel: false
                })
            }
            /* var testStr = "{\"practice_unit\":\"安吧观光团\",\"entry_name\":\"东风41\",\"practice_position\":\"清洁工\",
            \"experience_description\":\"呵呵哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或\",
            \"inauguration_status\":\"全职\",\"start_time\":\"2018-01-09\",\"end_time\":\"2022-03-13\"}"  //先尝试模拟返回JSON字符串 */
            var testStr = "{\"code\":200,\"success\":true,\"message\":\"查询成功\",\"data\":{\"total\":1,\"list\":[{\"enclosureAddress\":null,\"endTime\":\"2022-03-13\",\"entryName\":\"东风41\",\"experienceDescription\":\"呵呵哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或\",\"gmtCreate\":null,\"gmtModified\":null,\"inaugurationStatus\":\"全职\",\"practiceId\":null,\"practicePosition\":\"清洁工\",\"practiceUnit\":\"安吧观光团\",\"startTime\":\"2018-01-09\",\"status\": null,\"userNumber\": null}]}}"  //先尝试模拟返回JSON字符串
            this.responseProcess(testStr)  //调用前面写的响应处理函数
        }
    }
</script>

<style>
    .body {  /*根view*/
        padding: 32px 32px;
        font-size: 16rpx;
        line-height: 2em;
    }
    .title {  /*标题*/
        font-weight: bold;
    }
    .add {  /*添加实践经历按钮（链接）*/
        text-align: center;
        color: #ffffff;
        background-color: #007fff;
        padding: 16px;
        margin: 8px 0 16px 0;
    }
</style>
