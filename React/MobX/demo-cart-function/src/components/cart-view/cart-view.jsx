import React from 'react'
import { observer } from 'mobx-react'
import {
    Card,
    Space,
    Button
} from 'antd'

import 'antd/dist/antd.css'
import './cart-view.css'
// import { resetGlobalState } from 'mobx/dist/internal'
// import { Content } from 'antd/lib/layout/layout'

@observer
class CartView extends React.Component {
    render() {
        const { cartStore } = this.props
        // console.log('rend')
        return (
            <Space
                size={"large"}
                direction="vertical"
                align="center">
                {
                    cartStore.cart && cartStore.cart.map(item => (
                        <Card
                            key={item.name}
                            title={item.name}
                            /* style={{ width: 300 }} */>
                            价格：{item.price}
                        </Card>
                    ))
                }
                <Button type="primary" 
                    onClick={() => cartStore.addATShirt({  //注意有参数时要用函数去调用该函数，否则不执行
                        name: `T-Shirt${cartStore.itemCount}`,
                        price: cartStore.itemCount
                    })} /* style={{position: 'fix'}} */>
                    添加1件衬衫
                </Button>
            </Space>
        )
    }
}

export default CartView