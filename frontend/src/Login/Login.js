import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Cookies from 'js-cookie';

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
            loggedIn: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    reset() {
        this.setState({wrongEmail: false, wrongPassword: false, loggedIn: false});
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

    loggedIn() {
        if (this.state.loggedIn) {
            return <Redirect to="/saloane" />;
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
        this.reset();
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
                Cookies.set('user_id', result.data['user_id'], {expires: 7});
                this.setState({loggedIn: true});
                console.log('ok');
            }
        }).catch(function (error) {
            console.log(error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Enter your password"
                        />
                    </Form.Group>
                    <Button block disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </Form>

                {this.wrongEmail()}
                {this.wrongPassword()}
                {this.loggedIn()}
            </div>
        );
    }
};