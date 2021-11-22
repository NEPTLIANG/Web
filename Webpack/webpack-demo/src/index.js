import './style/style.css';
import Icon from './img/HA.png';
import Data from './xml/data.xml';
import numRef from './ref.json';
// import '@babel/polyfill';
// import { file, parse } from './js/globals.js';
// import _ from 'lodash';   //使用 ProvidePlugin 后webpack自带导入，无需手动import
/* babel-polyfill:
  npm i --save babel-polyfill
  最佳实践仍然是，不加选择地和同步地加载所有 polyfill/shim，
  尽管这会导致额外的 bundle 体积成本。
  否则，可把 import 放入一个新文件，
  并加入 whatwg-fetch polyfill 
*/
// import 'babel-polyfill';   
import add1s from './js/add1s';
// 入口文件1

// 将数字 1 到 5 转换为文本表示，反之亦然，例如将 2 转换为 '二'。
export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}

function getComponent() {
  return (
    /* 
      代码分割方式3：
      使用符合 ECMAScript 提案 的 import() 语法 来实现动态导入
      在注释中我们提供了 webpackChunkName。
      这样会将拆分出来的 bundle 命名为 lodash.bundle.js，
      而不是 [id].bundle.js 
    */ /*
      npm install eslint --save-dev
    */
    // /* eslint-disable */
    // eslint-disable-next-line
    import(/* webpackChunkName: "lodash" */ 'lodash')
      .then(({ default: _ }) => {
        var element = document.createElement('div');

        var button = document.createElement('button');
        var br = document.createElement('br');
        button.innerHTML = 'Click me and look at the console!';
        /* 
          使用 ProvidePlugin 暴露出某个模块中单个导出，
          通过配置一个“数组路径”
          （例如 [module, child, ...children?]）
          实现此功能。所以，我们假想如下，
          无论 join 方法在何处调用，
          我们都只会获取到 lodash 中提供的 join 方法 
        */
        // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
        // element.innerHTML = join(['Hello', 'webpack'], ' ');

        // 假设我们处于 `window` 上下文
        /* 
          当模块运行在 CommonJS 上下文中，
          这将会变成一个问题，
          也就是说此时的 this 指向的是 module.exports。
          在这种情况下，你可以通过使用 imports-loader 
          覆盖 this 指向 
        */
        this.alert('Hmmm, this probably isn\'t a great idea...')
        console.log('then');

        element.appendChild(br);
        element.appendChild(button);
        // element.onclick = Print.bind(null, 'Hello webpack!');

        /* 
          Note that 
          because a network request is involved, 
          some indication of loading would need to 
          be shown in a production-level site/app. 
        */
        button.onclick = e => (
          // 懒加载：等到第一次交互的时候再加载那个代码块
          import(/* webpackChunkName: "print" */ './js/add1s')
            .then(module => {
              /* 
                注意当调用 ES6 模块
                的 import() 方法（引入模块）时，
                必须指向模块的 .default 值，
                因为它才是 promise 被处理后
                返回的实际的 module 对象。 
              */
              let print = module.default;
              print()
            })
        )

        handleOtherRes();
        console.log(element);
        return element;
      })
      .catch(error => `An error occurred while loading the component: ${error}`)
    /* eslint-enable */
  );
}

// let element = document.createElement('div');

// element.innerHTML = _.join(['Hello', 'webpack'], ' ');
// element.classList.add('hello');
let handleOtherRes = () => {
  var btn = document.createElement('button');
  btn.innerHTML = '点击这里，然后查看 console！';
  btn.onclick = add1s(1);
  element.appendChild(btn);

  // 将图像添加到我们已经存在的 div 中。
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  console.log(Data);

  // return element;
}

// document.body.appendChild(component());
// let element = getComponent();    
// 存储element，以在add1s.js修改时重新渲染
// document.body.appendChild(element);
getComponent().then(component => {
  document.body.appendChild(component);
  /* 模块热替换HMR：
    配置热模块替换HMR，在 add1s.js 内部发生变更时，
    告诉 webpack 接受 updated module。 
  */
  /* 
    一旦module.hot为true，说明开启了HMR 
      --> 让HMR功能代码生效 
  */
  if (module.hot) {
    /* 
      方法会监听add1s.js文件的变化，一旦发生变化，
      其他模块不会重新打包构建。
      会执行后面的回调函数 
    */
    module.hot.accept('./js/add1s.js', function () {
      console.log('Accepting the updated printMe module!');
      // add1s();
      document.body.removeChild(element);
      element = getComponent();    //重新渲染“component”，以便更新click事件处理函数
      document.body.appendChild(element);

      /* 
        验证：条件地加载新的 polyfills.bundle.js 文件。
        根据需要支持的技术和浏览器来决定是否加载。
        我们将做一些简单的试验，
        来确定是否需要引入这些 polyfill 
      */
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
          console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
          console.log(json)
        })
        .catch(error => console.error('Something went wrong when fetching this data: ', error))
    })
  }
})

// 注册Service Worker以实现PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

/* “// eslint-disable-next-line”注释：
  通过“// eslint-disable-next-line”注释
  设置eslint所有规则在下一行都失效（下一行不进行eslint检查）
  （eslint的airbnb规范不允许console.log） 
*/
// eslint-disable-next-line
console.log(1);

// 在IE6测试Promise是否成功兼容
const pormise = new Promise(resolve => {
  setTimeout(() => {
    console.log('测试Promise是否成功兼容。定时器执行完毕，已兼容');
    resolve();
  }, 1000);
});
console.log(pormise);

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
/* 
  通过JS代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName: 'calc' */'./js/calc')
  .then((result) => {
    // 文件加载成功
    console.log(result);
  })
  .catch(() => {
    console.log('文件加载失败');
  });
console.log(sum(1, 2, 3, 4));