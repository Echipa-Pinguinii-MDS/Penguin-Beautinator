import React from 'react';
import PropTypes from 'prop-types';
import Services from './Services';
import Total from './Total';
import ScheduleButton from '../Calendar/ScheduleButton';
import TimePickButton from './TimePickButton';
import BackButton from './BackButton';
import './ShoppingCart.css';

function ShoppingCart (props) {
    return (
        <div className={'ShoppingCart'}>
            <h4 className = {'ServiciiSelectate'}>Servicii selectate</h4>
            <Services services={props.services}
                      handleClick={props.handleClick}/>
            <Total services={props.services}/>

            {!props.calendarPage &&
            <TimePickButton disabled={Object.keys(props.services).length === 0}
                            openCalendarPage={props.openCalendarPage}/>}

            {props.calendarPage &&
            <ScheduleButton disabled={props.disabled}
                            data={props.data}/>}

            {props.calendarPage &&
            <BackButton closeCalendarPage={props.closeCalendarPage}/>}
        </div>
    )
}

ShoppingCart.propTypes = {
    handleClick: PropTypes.func.isRequired,
    openCalendarPage: PropTypes.func.isRequired,
    closeCalendarPage: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    data: PropTypes.string
}

export default ShoppingCart;
