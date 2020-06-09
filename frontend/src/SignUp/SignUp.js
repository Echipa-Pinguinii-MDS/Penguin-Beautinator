import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',
            phoneNo: '',
            birthday: '',
            invalidEmail: false,
            invalidPassword: false,
            signedIn: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    reset() {
        this.setState({
            invalidEmail: false,
            invalidPassword: false,
            signedIn: false
        })
    }

    signedIn() {
        if (this.state.signedIn) {
            return <Redirect to='/login'/>;
        } else {
            return null;
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    checkPassword() {
        if (this.state.password !== this.state.passwordConfirmation)
            return <p>Cele doua parole nu se potrivesc</p>
    }

    handleChange = event => {
        let {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        this.reset();
        axios({
            method: 'post',
            url: 'user/SignUp/',
            data: {
                'user_email': this.state.email,
                'user_password': this.state.password
            },
            headers: {
                'content-type': 'application/json'
            },
        }).then(result => {
            if (!result.data['check_user']) {
                this.setState({invalidEmail: true});
                console.log('email gresit');
            } else if (!result.data['check_password']) {
                this.setState({invalidPassword: true});
                console.log('parola gresita');
            } else {
                this.setState({signedIn: true});
                console.log('ok');
            }
        }).catch(function (error) {
            console.log(error);
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className='SignUp'>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoFocus
                                      type='email'
                                      name='email'
                                      placeholder='Email'
                                      value={this.state.email}
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Parola</Form.Label>
                        <Form.Control type='password'
                                      name='password'
                                      value={this.state.password}
                                      onChange={this.handleChange}
                                      placeholder='Parola'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Reintrodu parola</Form.Label>
                        <Form.Control type='password'
                                      name='passwordConfirmation'
                                      value={this.state.passwordConfirmation}
                                      onChange={this.handleChange}
                                      placeholder='Parola'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nume</Form.Label>
                        <Form.Control type='text'
                                      name='lastName'
                                      value={this.state.lastName}
                                      onChange={this.handleChange}
                                      placeholder='Nume'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Prenume</Form.Label>
                        <Form.Control type='text'
                                      name='firstName'
                                      value={this.state.firstName}
                                      onChange={this.handleChange}
                                      placeholder='Prenume'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Numar de telefon</Form.Label>
                        <Form.Control type='text'
                                      name='phoneNo'
                                      value={this.state.phoneNo}
                                      onChange={this.handleChange}
                                      placeholder='Numar de telefon'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data nasterii</Form.Label>
                        <Form.Control type='date'
                                      name='date'
                                      value={this.state.firstName}
                                      onChange={this.handleChange}
                                      placeholder='Data nasterii'/>
                    </Form.Group>
                    <Button block disabled={!this.validateForm()} type='submit'>
                        Sign Up
                    </Button>
                </Form>

                {this.checkPassword()}
                {this.signedIn()}
            </div>
        )
    }
}

export default SignUp;
