import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Appointment from './Appointment';
import './Appointments.css'

const FutureAppointments = (props) => {
    return (
        <div className={'FutureAppointments'}>
            <h3>Programari viitoare</h3>

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

const Appointments = (props) => {
    return (
        <div className={'Appointments'}>
            <FutureAppointments appointments={props.futureAppointments}/>
            <PastAppointments appointments={props.pastAppointments}/>
        </div>
    )
}

Appointments.defaultProps = {
    futureAppointments: [{
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
        name: 'Salon1',
        contact: ['Lorem Ipsum 10', '0712345678', 'salon@salon.com'],
        time: ['20.06.2020', '11.00-12.00'],
        price: 100,
        services: {
            coafor: ['Tuns - par scurt', 'Spalat'],
            manichiura: ['Clasic']
        }
    }, {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
        name: 'Salon1',
        contact: ['Lorem Ipsum 10', '0712345678', 'salon@salon.com'],
        time: ['20.06.2020', '12.00-13.00'],
        price: 100,
        services: {
            coafor: ['Tuns - par scurt', 'Spalat'],
            manichiura: ['Clasic']
        }
    }],
    pastAppointments: [{
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
        name: 'Salon1',
        contact: ['Lorem Ipsum 10', '0712345678', 'salon@salon.com'],
        time: ['19.06.2020', '11.00-12.00'],
        price: 100,
        services: {
            coafor: ['Tuns - par scurt', 'Spalat'],
            manichiura: ['Clasic']
        }
    }, {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
        name: 'Salon1',
        contact: ['Lorem Ipsum 10', '0712345678', 'salon@salon.com'],
        time: ['18.06.2020', '11.00-12.00'],
        price: 100,
        services: {
            coafor: ['Tuns - par scurt', 'Spalat'],
            manichiura: ['Clasic']
        }
    }]
}

Appointments.propTypes = {
    appointments: PropTypes.array
}

export default Appointments;
