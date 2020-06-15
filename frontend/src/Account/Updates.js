import React from 'react';
import FirstName from './FormGroups/FirstName';
import LastName from './FormGroups/LastName';
import PhoneNo from './FormGroups/PhoneNo';
import Birthday from './FormGroups/Birthday';
import Cookies from 'js-cookie';
import {userDataById} from '../Universal/Queries';
import {Button} from 'react-bootstrap';

class Updates extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: Number(Cookies.get('user_id').substring(1)),
            email: '',
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
            firstName: '',
            lastName: '',
            phoneNo: '',
            birthday: new Date(),
            update: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.refreshUserData = this.refreshUserData.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
    }

    componentDidMount() {
        this.refreshUserData()
    }

    refreshUserData() {
        userDataById(this.state.id).then(result => {
            this.setState({
                email: result.email,
                firstName: result.firstName,
                lastName: result.lastName,
                phoneNo: result.phoneNo,
                birthday: result.birthday
            })
        })
    }

    handleChange = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value,
            update: false
        })
    }

    handleSubmit() {
        this.setState({
            update: true
        })
    }

    checkPassword() {
        if (this.state.newPassword !== this.state.newPasswordConfirmation) {
            return <p className={'FormError'}>Cele doua parole nu se potrivesc</p>
        }
    }

    render() {
        return (
            <div className={'Updates'}>
                <h2>Schimba setarile contului</h2>
                <LastName lastName={this.state.lastName}
                          handleChange={this.handleChange}/>
                <FirstName firstName={this.state.firstName}
                           handleChange={this.handleChange}/>
                <PhoneNo phoneNo={this.state.phoneNo}
                         handleChange={this.handleChange}/>
                <Birthday birthday={this.state.birthday}
                          handleChange={this.handleChange}/>
                <Button block onClick={this.handleSubmit} type='submit'>
                    Schimba
                </Button>

                {this.checkPassword()}
                {this.state.update &&
                <p className={'FormUpdate'}>Schimbarea a fost inregistrata</p>}
            </div>
        )
    }
}

export default Updates;
