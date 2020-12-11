/*
 * @Author: NeptLiang
 * @Date: 2020-11-25 15:01:28
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-07 18:37:51
 * @Description: 新版MobX Demo（购物车）
 */
import React from 'react'
import ReactDOM from 'react-dom'

import CartStore from './stores/cart-store'
import App from './containers/app'

ReactDOM.render(
    <App cartStore={new CartStore()} />,
    document.getElementById('root')
)