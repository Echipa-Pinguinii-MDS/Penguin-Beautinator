import React from 'react';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';
import PropTypes from 'prop-types';
import './Appointment.css'
import {Link} from "react-router-dom";

const AppointmentCategories = (props) => {
    return (
        <div className={'AppointmentCategories'}>
            <p className={'AppointmentCategory'}>{props.category + ': '}</p>
            {props.services.map(service =>
                <p key={service}
                   className={'AppointmentService'}>{service}</p>)}
            </div>
    )
}

const DetailsButton = (props) => {
    return (
        <div className={'DetailsButton'}
             onClick={props.triggerButton}>
            {props.opened &&
                <IoIosArrowUp className={'io'}/>}
            {!props.opened &&
                <IoIosArrowDown className={'io'}/>}
            <p>Detalii</p>
        </div>
    )
}

class AppointmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
        this.triggerButton = this.triggerButton.bind(this)
    }

    triggerButton() {
        this.setState(state => ({
            opened: !state.opened
        }))
    }

    render() {
        return (
            <div className={'AppointmentDetails'}>
                <DetailsButton triggerButton={this.triggerButton}
                               opened={this.state.opened}/>
                {this.state.opened &&
                    Object.keys(this.props.services).map(category =>
                        <AppointmentCategories key={category}
                                               category={category}
                                               services={this.props.services[category]}/>)}
            </div>
        )
    }
}

const AppointmentDate = (props) => {
    return (
        <div className={'AppointmentDate'}>
            <p>{props.date}</p>
            <p>{props.time}</p>
        </div>
    )
}

const AppointmentSalon = (props) => {
    return (
        <div className={'AppointmentSalon'}>
            <p>{props.name}</p>
            <p>{props.address}</p>
        </div>
    )
}

const AppointmentMain = (props) => {
    return (
        <div className={'AppointmentMain'}>
            <img src={props.appointment.src}
                 alt={''}/>
            <AppointmentSalon name={props.appointment.salon}
                              address={props.appointment.address}/>
            <AppointmentDate date={props.appointment.date}
                             time={props.appointment.startTime + ' - ' + props.appointment.endTime}/>
            <p className={'AppointmentTotal'}>Total: {props.appointment.price}</p>
        </div>
    )
}

const Appointment = (props) => {
    return (
        <div className={'Appointment'}>
            <AppointmentMain appointment={props.appointment}/>
            <AppointmentDetails services={props.appointment.services}/>
        </div>
    )
}

const Appointments = (props) => {
    return (
        <div className={'Appointments'}>
        <h3>Programari viitoare</h3>
        {props.futureAppointments.length === 0 &&
            <p>Nu ai nicio programare momentan.
                <br/>
                Iti poti face una la orice <Link to={'/saloane'}>salon disponibil.</Link>
            </p>}
        {props.futureAppointments.length > 0 &&
            props.futureAppointments.map(appointment =>
                <Appointment key={appointment}
                             appointment={appointment}/>)}

        <h3>Programari trecute</h3>
        {props.lastAppointments.length === 0 &&
            <p>Nu ai avut nicio programare.</p>}
        {props.lastAppointments.length > 0 &&
        props.lastAppointments.map(appointment =>
            <Appointment key={appointment}
                         appointment={appointment}/>)}
        </div>
    )
}

Appointments.defaultProps = {
    futureAppointments: [{
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
        salon: 'Salon1',
        address: 'Lorem Ipsum 10',
        date: '20.06.2020',
        startTime: '11.00',
        endTime: '12.00',
        price: 100,
        services: {
            coafor: ['Tuns - par scurt', 'Spalat'],
            manichiura: ['Clasic']
        }
    }],
    lastAppointments: []
}

Appointments.propTypes = {
    appointments: PropTypes.array
}

export default Appointments;
