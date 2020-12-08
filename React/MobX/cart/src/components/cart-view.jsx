import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import 'antd/dist/antd.css'

@observer 
/* export default */ class CartView extends React.Component {
    constructor(props) {
        super(props)
    //     this.onAdd = this.onAdd.bind(this)
    }

    render() {
        const { cartStore } = this.props
        return (
            <div>
                <h1>购物车</h1>
                {
                    // /* cartStore.cart &&  */cartStore.cart.map(item => (
                    cartStore.cart && cartStore.cart.map(item => (
                        // <div>
                        <div key={item.name}>
                            <h2>商品：{item.name}</h2>
                            <p>价格：{item.price}</p>
                        </div>
                    ))
                }
                <Button type="primary" onClick={cartStore.addATShirt}>添加1件衬衫</Button>
                {/* <Button type="primary" onClick={this.onAdd.bind(this)}>添加1件衬衫</Button> */}
            </div>
        )
    }
}

export default CartView