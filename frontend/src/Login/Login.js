import React, { Component } from "react";
import { Button, FormGroup, Label, Form, Input } from "reactstrap";
import "./Login.css";
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            wrongEmail: false,
            wrongPassword: false,
        };
    }

    resetWrong() {
        this.setState({wrongEmail: false, wrongPassword: false});
    }

    wrongEmail() {
        if (this.state.wrongEmail) {
            return <p>Email gresit</p>;
        } else {
            return null;
        }
    }

    wrongPassword() {
        if (this.state.wrongPassword) {
            return <p>Parola gresita</p>;
        } else {
            return null;
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        let {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        this.resetWrong();
        axios({
            method: 'post',
            url: 'user/login/',
            data: {
                'user_email': this.state.email,
                'user_password': this.state.password
            },
            headers: {
                "content-type": "application/json"
            },
        }).then(result => {
            if (!result.data['check_user']) {
                this.setState({wrongEmail: true});
                console.log('email gresit');
            } else if (!result.data['check_password']) {
                this.setState({wrongPassword: true});
                console.log('parola gresita');
            } else {
            //    ok
                console.log('ok');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="Login">
                <Form>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            autoFocus
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter your email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter your password"
                        />
                    </FormGroup>
                </Form>
                <Button block bssize="large" disabled={!this.validateForm()} onClick={this.handleSubmit.bind(this)}>
                    Login
                </Button>
                {this.wrongEmail()}
                {this.wrongPassword()}
            </div>
        );
    }
};