import React from 'react'
import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import Signature from '../signature/signature'
import Verify from '../verify/verify'

export default class DigitalSignature extends React.Component {
    render() {
        return (
            <Router>
                <div class="card" >
                    <nav class="subNav" >
                        <ul>
                            <li>
                                <NavLink to="/digital-signature/signature" >签名</NavLink>
                            </li>
                            <div class="splitLine" ></div>
                            <li>
                                <NavLink to="/digital-signature/verify" >验证</NavLink>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/digital-signature/signature" component={Signature} />
                        <Route path="/digital-signature/verify" component={Verify} />
                        <Redirect to="/digital-signature/signature" />
                    </Switch>
                </div>
            </Router>
        )
    }
}
