import React from 'react'

export default class Signature extends React.Component {
    render() {
        return (
            <div>
                <h2>签名</h2>
                <span>消息</span>
                <input type="text" id="em" name="em"/>
                <input type="submit" value="签名"/>
            </div>
        )
    }
}
