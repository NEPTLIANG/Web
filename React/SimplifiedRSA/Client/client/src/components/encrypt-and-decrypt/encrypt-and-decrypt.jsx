import React from 'react'
import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import Encrypt from '../encrypt/encrypt'
import Decrypt from '../decrypt/decrypt'

export default class EncryptAndDecrypt extends React.Component {
    render() {
        return (
            <Router>
                <nav class="subNav" >
                    <ul>
                        <li>
                            <NavLink to="/encrypt-and-decrypt/encrypt">加密</NavLink>
                        </li>
                        <li>
                            <NavLink to="/encrypt-and-decrypt/decrypt">解密</NavLink>
                        </li>
                    </ul>
                </nav>
                
                <Switch>
                    <Route path="/encrypt-and-decrypt/encrypt" component={Encrypt} />
                    <Route path="/encrypt-and-decrypt/decrypt" component={Decrypt} />
                </Switch>
                {/*<Redirect to="/encrypt-and-decrypt/encrypt" />*/}
            </Router>
        )
    }
}
