import React from 'react'
//import ReactDOM from 'react-dom'

export default class Encrypt extends React.Component {
    render() {
        return (
            <div id="body">
                <h2>加密</h2>
                <span>明文</span>
                <input type="text" id="em" name="em"/> <br/>
                <input type="submit" value="加密"/>
            </div>
        )
    }
}
