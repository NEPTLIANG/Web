import React from 'react'
import { 
    BrowserRouter as Router, 
    Switch,
    Route, 
    NavLink 
} from 'react-router-dom'

import EncryptAndDecrypt from '../components/encrypt-and-decrypt/encrypt-and-decrypt'
import DigitalSignature from '../components/digital-signature/digital-signature'
//import '../index.css'

export default class RSA extends React.Component {
    render() {
        return (
            <Router>
                <header>
                    <h1>RSA加解密、数字签名系统</h1>
                </header>
                <main>
                    <aside>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/encrypt-and-decrypt" >加密 & 解密</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/digital-signature" >签名 & 验证</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    
                    <article>
                        <Switch>
                            <Route path="/encrypt-and-decrypt" >
                                <EncryptAndDecrypt/>
                            </Route>
                            <Route path="/digital-signature" >
                                <DigitalSignature/>
                            </Route>
                        </Switch>
                    </article>
                </main>
            </Router>
        )
    }
}
