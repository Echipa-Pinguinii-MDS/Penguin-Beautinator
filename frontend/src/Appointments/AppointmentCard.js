import React from 'react';
import PropTypes from 'prop-types';

const AppointmentContact = (props) => {
    console.log("App card props:", props)
    return (
        <div className={'AppointmentContact'}>
            <p>{props.name}</p>
            {props.contact.map(contact =>
                <p key={contact}>{contact}</p>)}
        </div>
    )
}

AppointmentContact.propTypes = {
    name: PropTypes.string.isRequired,
    contact: PropTypes.array.isRequired
}

const AppointmentTime = (props) => {
    return (
        <div className={'AppointmentTime'}>
            {props.time.map(time =>
                <p key={time}>{time}</p>)}
        </div>
    )
}

AppointmentTime.propTypes = {
    time: PropTypes.array.isRequired
}

const AppointmentPrice = (props) => {
    return (
        <p className={'AppointmentPrice'}>Total: {props.price}</p>
    )
}

AppointmentPrice.propTypes = {
    price: PropTypes.number.isRequired
}

const AppointmentCard = (props) => {
    return (
        <div className={'AppointmentCard'}>
            <img src={props.appointment.src}
                 alt={''}/>
            <AppointmentContact name={props.appointment.name}
                              contact={props.appointment.contact}/>
            <AppointmentTime time={props.appointment.time}/>
            <AppointmentPrice price={props.appointment.price}/>
        </div>
    )
}

AppointmentCard.propTypes = {
    appointment: PropTypes.object.isRequired
}

export default AppointmentCard;
