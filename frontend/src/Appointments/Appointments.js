import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Appointment from './Appointment';
import './Appointments.css'
import {userAppointments} from "../Universal/Queries";
import Cookies from "js-cookie";

const FutureAppointments = (props) => {
    return (
        <div className={'FutureAppointments'}>
            <h3>Programari</h3>

            {props.appointments.length === 0 &&
            <p className={'NoFutureAppointments'}>
                Nu ai nicio programare momentan.<br/>
                Iti poti face una la oricare <Link to={'/saloane'}>salon disponibil.</Link>
            </p>}

            {props.appointments.length > 0 &&
            props.appointments.map(appointment =>
                <Appointment key={appointment.time}
                             appointment={appointment}/>)}
        </div>
    )
}

FutureAppointments.propTypes = {
    appointments: PropTypes.array.isRequired
}

const PastAppointments = (props) => {
    return (
        <div className={'PastAppointments'}>
            <h3>Programari trecute</h3>

            {props.appointments.length === 0 &&
            <p className={'NoPastAppointments'}>Nu ai avut nicio programare pana acum.</p>}

            {props.appointments.length > 0 &&
            props.appointments.map(appointment =>
                <Appointment key={appointment.time}
                             appointment={appointment}/>)}
        </div>
    )
}

PastAppointments.propTypes = {
    appointments: PropTypes.array.isRequired
}

class Appointments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: Cookies.get('user_id') !== undefined,
            futureAppointments: [],
            // pastAppointments: []
        }
    }

    componentDidMount() {
        if (this.state.loggedIn) {
            this.refreshAppointments()
        }
    }

    refreshAppointments() {
        let userId = Cookies.get('user_id')
        userId = Number(userId.substring(1, userId.length))
        userAppointments(userId).then(result => {
            this.setState({futureAppointments: result})
        })
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <div className={'Appointments'}>
                    <FutureAppointments appointments={this.state.futureAppointments}/>
                    {/*<PastAppointments appointments={this.state.pastAppointments}/>*/}
                </div>
            )
        } else {
            return (
                <div className={'Appointments'}>
                    <h3>Pentru a vedea programarile intrati in <Link to={'/account'}>cont</Link>.</h3>
                </div>
            )
        }
    }
}

Appointments.propTypes = {
    appointments: PropTypes.array
}

export default Appointments;
