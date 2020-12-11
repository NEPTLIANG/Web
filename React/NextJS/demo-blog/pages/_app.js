/*
 * @Author: NeptLiang
 * @Date: 2020-12-10 14:18:52
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-10 14:35:19
 * @Description: 全局样式
 */
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}  
/* 该App组件是顶级组件，将在所有不同页面上通用
例如，在页面之间跳转时，可以使用此App组件来保持state
添加pages/_app.js时，您需要重新启动开发服务器
在Next.js中，您可以通过从pages/_app.js中导入全局CSS文件来添加它们
您无法在其他任何地方导入全局CSS。 */