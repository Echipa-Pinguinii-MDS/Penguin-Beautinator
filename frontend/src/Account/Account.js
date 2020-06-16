import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

const Account = () => {
    return (
        <div className={'login-wrap'}>
            <div className={"login-html"}>
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked/> <label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up"/> <label htmlFor="tab-2" className="tab">Sign Up</label>
                <div className={'login-form'}>
                    <Login/>
                    <SignUp/>
                </div>
            </div>
        </div>
    )
}

export default Account;
