!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("lodash")):"function"==typeof define&&define.amd?define(["lodash"],n):"object"==typeof exports?exports.webpackNumbers=n(require("lodash")):e.webpackNumbers=n(e._)}(self,(function(e){return(self.webpackChunkwebpackNumbers=self.webpackChunkwebpackNumbers||[]).push([[143],{3372:function(e,n,o){"use strict";o.r(n),o.d(n,{numToWord:function(){return s},wordToNum:function(){return d}}),o(5827),o(6992),o(1539),o(8674),o(8783),o(3948),o(2564),o(8368);var t=o(9970),r=o.n(t),c=o(9675),u=o(1309),i=o(390);function s(e){return _.reduce(u,(function(n,o){return o.num===e?o.word:n}),"")}function d(e){return _.reduce(u,(function(n,o){return o.word===e&&e.toLowerCase()?o.num:n}),-1)}function l(){var e=this;return Promise.resolve().then(o.t.bind(o,8092,23)).then((function(n){n.default,console.log("then");var t=document.createElement("div"),r=document.createElement("button"),c=document.createElement("br");return r.innerHTML="Click me and look at the console!",e.alert("Hmmm, this probably isn't a great idea..."),t.appendChild(c),t.appendChild(r),r.onclick=function(e){return Promise.resolve().then(o.bind(o,390)).then((function(e){(0,e.default)()}))},a(),console.log(t),t})).catch((function(e){return"An error occurred while loading the component: ".concat(e)}))}var a=function(){var e=document.createElement("button");e.innerHTML="点击这里，然后查看 console！",e.onclick=(0,i.default)(1),element.appendChild(e);var n=new Image;n.src=r(),element.appendChild(n),console.log(c.Z)};l().then((function(n){document.body.appendChild(n),e.hot.accept(390,function(e){i=o(390),console.log("Accepting the updated printMe module!"),document.body.removeChild(element),element=l(),document.body.appendChild(element),fetch("https://jsonplaceholder.typicode.com/users").then((function(e){return e.json()})).then((function(e){console.log("We retrieved some data! AND we're confident it will work on a variety of browser distributions."),console.log(e)})).catch((function(e){return console.error("Something went wrong when fetching this data: ",e)}))}.bind(this))})),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/service-worker.js").then((function(e){console.log("SW registered: ",e)})).catch((function(e){console.log("SW registration failed: ",e)}))})),console.log(1);var f=new Promise((function(e){setTimeout((function(){console.log("测试Promise是否成功兼容。定时器执行完毕，已兼容"),e()}),1e3)}));console.log(f),o.e(722).then(o.bind(o,6121)).then((function(e){console.log(e)})).catch((function(){console.log("文件加载失败")})),console.log(function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return n.reduce((function(e,n){return e+n}),0)}(1,2,3,4))},390:function(e,n,o){"use strict";function t(e){console.log(e)}o.r(n),o.d(n,{default:function(){return t},add1s:function(){return r},subtract1s:function(){return c}}),o(8092),console.log("The print.js module has loaded! See the network tab in dev tools..."),console.log();var r=function(e){return cosole.log("+1s"),"剩余".concat(e++,"秒")},c=function(e){return console.log("-1s"),"剩余".concat(e--,"秒")}},9675:function(e,n,o){"use strict";n.Z=o.p+"media/3d687a0dab54297050f5fec68d06ffab.xml"},8368:function(e,n,o){"use strict";var t=o(4783)(e.id,{locals:!1});e.hot.dispose(t),e.hot.accept(void 0,t)},9970:function(e,n,o){e.exports=o.p+"imgs/98c41d4a28.png"},8092:function(n){"use strict";n.exports=e},1309:function(e){"use strict";e.exports=JSON.parse('[{"num":0,"word":"零"},{"num":1,"word":"一"},{"num":2,"word":"二"},{"num":3,"word":"三"},{"num":4,"word":"四"},{"num":5,"word":"五"},{"num":6,"word":"六"},{"num":7,"word":"七"},{"num":8,"word":"八"},{"num":9,"word":"九"},{"num":10,"word":"十"}]')}},function(e){return e.O(0,[216],(function(){return 3372,e(e.s=3372)})),e.O()}])}));
//# sourceMappingURL=app.b7f8c15ca0.bundle.js.map