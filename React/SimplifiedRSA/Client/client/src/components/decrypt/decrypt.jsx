import React from 'react'

export default class Decrypt extends React.Component {
    render() {
        return (
            <div>
                <h2>解密</h2>
                <span>密文</span>
                <input type="text" id="dc" name="dc"/>
                <br/>
                <span>私钥{"{p,q,d}"}</span>
                <input type="text" name="dpri" id="dpri"/>
                <br/>
                <input type="submit" value="解密"/>
            </div>
        )
    }
}
