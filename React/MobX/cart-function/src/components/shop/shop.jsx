import React from 'react'
import { observer } from 'mobx-react'
import {
    Form,
    Input,
    InputNumber,
    Tooltip,
    // Space,
    Button
} from 'antd'

@observer
class Shop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  //构造方法中直接给state赋值，其他方法中用setState
            validateStatus: 'success'
        }
        // console.log('construct', this.state)
    }

    validatePrice = (price) => {
        if (typeof (price) === 'undefined') {
            return {
                validateStatus: 'error',
                errorMsg: '价格不能为空'
            }
        }
        if (price <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: '请正确填写价格'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handlePriceChange = (value) => {
        this.setState({
            ...this.validatePrice(value),
            value
        })
        console.log(this.state)
    }

    handleFormFinish = (value) => {
        if ((typeof(this.state.value) === 'undefined')
            || (this.state.value <= 0)) {
            alert('请正确填写价格')
            return
        }
        // console.log(this.state.value, value)
        this.props.cartStore.addATShirt({
            name: value.name,
            price: this.state.value
        })
    }

    render() {
        const { cartStore } = this.props
        // console.log('rend', this.state)
        return (
            <Form name="shop" onFinish={this.handleFormFinish}>
                {/* <Space size="small" direction="vertical" align="start"> */}
                <Form.Item name="name"
                    rules={[{ required: true, message: '商品名不能为空' }]}>
                    <Input prefix="商品名：" allowClear /* size="large" */ placeholder="请输入商品名" />
                </Form.Item>
                <Form.Item label="价格：">
                    <Tooltip title="价格">
                        <Form.Item name="price"
                            // rules={[{ required: true, message: '必填' }]}
                            validateStatus={this.state.validateStatus}
                            help={this.state.errorMsg}>  {/* 要放在<Form.item>里而非<Form>里 */}
                            <InputNumber /* min={0} */
                                value={this.state.value}
                                // prefix="￥"  //<InputNumber/>不显示前后缀
                                onChange={this.handlePriceChange} /* size="large" */ placeholder="请输入价格" style={{ width: '100%' }} />
                        </Form.Item>
                    </Tooltip>
                </Form.Item>
                <Button htmlType="submit">添加</Button>
                {/* </Space> */}
            </Form>
        )
    }
}

export default Shop