import React from 'react'
import { observer } from 'mobx-react'
import {
    Button,
    Space,
    Layout,
    Menu,
    Breadcrumb
} from 'antd'

import CartView from '../components/cart-view/cart-view'
import Shop from '../components/shop/shop'
import 'antd/dist/antd.css'
import logo from '../default/logo.svg'

const { Header, Footer, Sider, Content } = Layout

@observer
class App extends React.Component {
    render() {
        const { cartStore } = this.props
        return (
            <Layout className="layout" style={{ flex: '1 1 100%' }}>
                <Header style={{ position: 'fixed', width: '100%', zIndex: 100 }}>
                    <div className="logo" style={{ float: "left" }}>
                        <img src={logo} alt="test" style={{ height: 32 }} />
                    </div>
                    {/* <h1>Title</h1> */}
                    <Menu mode="horizontal" theme="dark" /* defaultSelectedKeys={'Cart'} */>
                        <Menu.Item key="Cart">采购</Menu.Item>
                        <Menu.Item key="ToDo">待办事项</Menu.Item>
                    </Menu>
                </Header>

                <Layout style={{ marginTop: 64, flex: '1 1 100%' }}>
                    {/* 添加商品 */}
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>主页</Breadcrumb.Item>
                            <Breadcrumb.Item>采购</Breadcrumb.Item>
                        </Breadcrumb>
                        <Space size={"small"} direction="vertical"
                            align="start" className="content" style={{ padding: '16px 32px', backgroundColor: '#fff'/* , height: 10000 */ }}>
                            <h1>添加商品</h1>
                            <Shop cartStore={cartStore} />
                        </Space>
                        <Footer style={{ bottom: 0 }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Content>

                    {/* 购物车 */}
                    <Sider /* collapsible */ style={{/* position: 'fixed', right: 0, */ overflow: 'auto', padding: 16 }}>
                        <Space size={"large"} direction="vertical"
                            align="center" style={{ width: '100%' }}>
                            <h1 style={{ color: '#bfbfbf' }}>购物车</h1>
                            <div>
                                <Space
                                    size={"large"}
                                    direction="vertical"
                                    align="center">
                                    <CartView cartStore={this.props.cartStore} />
                                    {/* {
                                        cartStore.cart && cartStore.cart.map(item => (
                                            <Card
                                                key={item.name}
                                                title={item.name}>
                                                价格：{item.price}
                                            </Card>
                                        ))
                                    } */}
                                </Space>
                            </div>
                        </Space>
                    </Sider>
                </Layout>
            </Layout>
        )
    }
}

export default App