<template>
	<div id="app">
		<!-- <img alt="Vue logo" src="./assets/logo.png"> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<WordCard v-for="word in this.words" :word="word.word" :show="word.show" 
			:pronunciation="word.pronunciation" :translation="word.translation" :key="word.word"></WordCard>
	</div>
</template>

<script>
	// import HelloWorld from './components/HelloWorld.vue'
	import WordCard from "./components/WordCard.vue"

	export default {
		name: 'App',
		components: {
			// HelloWorld,
			WordCard
		},
		data() {
			return {
				words: []
			}
		},
		created() {
			// console.log("test");
			var responseObj = {
				status: 200,
				reason: "OK",
				words: [
					{
						word: "XSS",
						show: true,
						pronunciation: "chaeses",
						translation: "跨站脚本"
					}, {
						word: "SQLInject",
						show: true,
						pronunciation: "eskiuelinject",
						translation: "SQL注入"
					}, {
						word: "CSRF",
						show: true,
						pronunciation: "xiesaref",
						translation: "跨站请求伪造"
					}
				]
			};
			var response = JSON.stringify(responseObj);
			/* var url = "www.baidu.com";
			this.$http.jsonp(url).then((res) => {
				console.log(res);
			}, () => {
				console.log(response);
			}) */
			this.words = JSON.parse(response).words;
			// console.log(this.words);
		}
	}
</script>

<style>
	#app {  /*不能在template套css*/
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		/* margin-top: 60px; */
        display: flex;
        align-items: flex-end;
        flex: 1 1 auto;
        /* width: max-content; */
        padding: 0 32px;
	}
    html, body, #app {
        font-size: 16px;
        background-color: #133;
        margin: 0 !important;
        /* padding: 0; */
        height: 100%;
        width: max-content;
    }
</style>