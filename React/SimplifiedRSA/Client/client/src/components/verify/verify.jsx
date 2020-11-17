import React from 'react'

export default class Verify extends React.Component {
    render() {
        return (
            <div>
                <h2>验证</h2>
                <span>签名后的消息</span>
                <input type="text" id="dc" name="dc"/>
                <br/>
                <span>公钥{"{e,n}"}</span>
                <input type="text" id="dpub" name="dpub"/>
                <input type="submit" value="验证"/>
            </div>
        )
    }
}
