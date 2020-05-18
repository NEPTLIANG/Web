<template>
    <div v-if="show" class="card">
        <h3>{{word}}</h3>
        <p id="pronunciation">/{{pronunciation}}/</p>
        <p id="translation">{{translation}}</p>
        <a id="edit" @click="edit">编辑</a>
        <button id="finish" @click="finish">✔</button>
    </div>
</template>

<script>
    export default {
        props: {
            // show: true,
            // word: "Null",
            // pronunciation: "unknown pronunciation",
            // translation: "暂无翻译"
            show: {},
            word: {},
            pronunciation: {},
            translation: {}
        },
        data() {
            return {
                // show: true
            }
        },
        methods: {
            edit() {  //别忘了箭头函数的this指向问题
                alert("暂未开放此功能");
            },
            finish() {
                this.show = false;
            }
        }
    }
</script>

<style>
    .card {
        /* background-color: #ddd; */
        /* width: 75%; */
        color: #bfb;
        flex: 1 0 20%;
        margin: 64px 16px;
        padding: 64px;
        border-radius: 16px;
        box-shadow: 0 0 16px rgba(191, 255, 191, 1);
    }
    h3 {
        font-size: 32px;
    }
    #pronunciation {
        margin: -24px 0 32px 0;
        color: #7b7;
        font-size: 14px;
    }
    #edit, #finish {
        display: block;
        /* height: 32px; */
        margin: 16px 0;
    }
    #edit {
        width: 100%;
        color: #7b7;
        padding: 16px 0;
    }
    #finish {
        height: 64px;
        width: 64px;
        font-size: 24px;
        color: #133;
        background-color: #bfb;
        padding: 0;
        margin:  auto;
        border: none;
        border-radius: 64px;
    }
</style>