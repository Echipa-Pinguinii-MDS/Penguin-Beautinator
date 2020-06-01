import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        axios({
            method: 'post',
            url: 'user/login/',
            data: {
                'user_email': email,
                'user_password': password
            },
            headers: {
                "content-type": "application/json"
            },
        }).then(result => {
            if (!result.data['check_user']) {
            //    email gresit
                console.log('email gresit');
            } else if (!result.data['check_password']) {
            //    parola gresita
                console.log('parola gresita');
            } else {
            //    ok
                console.log('ok');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bssize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bssize="large" disabled={!validateForm()} type="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </form>
        </div>
    );
}