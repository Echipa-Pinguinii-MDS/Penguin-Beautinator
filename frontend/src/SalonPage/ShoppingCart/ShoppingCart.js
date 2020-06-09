import React from 'react';
import PropTypes from 'prop-types';
import Services from './Services';
import Total from './Total';
import ScheduleButton from '../Calendar/ScheduleButton';
import TimePickButton from './TimePickButton';
import './ShoppingCart.css';

function ShoppingCart (props) {
    return (
        <div className={'ShoppingCart'}>
            <h4>Servicii selectate</h4>
            <Services services={props.services} handleClick={props.handleClick}/>
            <Total services={props.services}/>
            {props.calendarPage &&
                <ScheduleButton disabled={props.time == null}/>}
            {!props.calendarPage &&
                <TimePickButton openCalendarPage={props.openCalendarPage}/>}
        </div>
    )
}

ShoppingCart.propTypes = {
    handleClick: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired,
    time: PropTypes.object
}

ShoppingCart.defaultProps = {
    services: {
        coafor: [
            {id: 3, title: 'Tuns - par lung', price: 20, length: 30}],
        manichiura: [
            {id: 4, title: 'Clasic', price: 25, length: 15},
            {id: 5, title: 'Semipermanenta', price: 50, length: 30}]
    }
}

export default ShoppingCart;
