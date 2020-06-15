import React from 'react';
import FirstName from './FormGroups/FirstName';
import LastName from './FormGroups/LastName';
import PhoneNo from './FormGroups/PhoneNo';
import Birthday from './FormGroups/Birthday';
import Cookies from "js-cookie";
import {userDataById} from "../Universal/Queries";

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
            birthday: new Date()
        }
        this.handleChange = this.handleChange.bind(this)
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
            [name]: value
        })
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
            </div>
        )
    }
}

export default Updates;
