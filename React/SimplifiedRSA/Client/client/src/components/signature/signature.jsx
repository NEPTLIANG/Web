import React from 'react'

export default class Signature extends React.Component {
    render() {
        return (
            <div class="main" >
                <h2>签名</h2>
                <span>消息</span>
                <input type="text" id="em" name="em"/>
                <br/>
                <input type="submit" value="签名"/>
            </div>
        )
    }
}
