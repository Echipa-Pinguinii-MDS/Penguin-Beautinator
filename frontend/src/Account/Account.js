import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Cookies from 'js-cookie';
import Updates from "./Updates";

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: Cookies.get('user_id') !== undefined
        }
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div className={'login-wrap'}>
                    <div className={"login-html"}>
                        <input id="tab-1" type="radio" name="tab" class="sign-in" checked/> <label htmlFor="tab-1"
                                                                                                   className="tab">Sign
                        In</label>
                        <input id="tab-2" type="radio" name="tab" class="sign-up"/> <label htmlFor="tab-2"
                                                                                           className="tab">Sign
                        Up</label>
                        <div className={'login-form'}>
                            <Login/>
                            <SignUp/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'login-wrap'}>
                    <div className={"login-html"}>
                        <div className={"login-form"}>
                            <Updates/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Account;
