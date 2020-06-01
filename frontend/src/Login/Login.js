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
            this.resetWrong();
            return true;
        } else {
            return false;
        }
    }

    wrongPassword() {
        if (this.state.wrongPassword) {
            this.resetWrong();
            return true;
        } else {
            return false;
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
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            autoFocus
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter password"
                        />
                    </FormGroup>
                    <Button block bssize="large" disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </Form>
                {this.wrongEmail() ? <p>Email gresit</p> : null}
                {this.wrongPassword() ? <p>Parola gresita</p> : null}
            </div>
        );
    }
};