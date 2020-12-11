/*
 * @Author: NeptLiang
 * @Date: 2020-11-25 15:01:28
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-03 17:05:53
 * @Description: MobX Demo（购物车）
 */
// import 'react-devtools'
import React from 'react'
import ReactDOM from 'react-dom'

import CartStore from './stores/cart-store'
import CartView from './components/cart-view'
// import './index.css'


ReactDOM.render(
    // <Provider cartStore={new CartStore()}>
    // <CartView cartStore={CartStore} />,
    <CartView cartStore={new CartStore()} />,
    // </Provider>,
    document.getElementById('root')
)