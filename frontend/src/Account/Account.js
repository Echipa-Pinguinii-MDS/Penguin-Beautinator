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
        return (
            <div className={'Account'}>
                {!this.state.loggedIn &&
                <Login/>}
                {!this.state.loggedIn &&
                <SignUp/>}
                {this.state.loggedIn &&
                <Updates/>}
            </div>
        )
    }
}

export default Account;
