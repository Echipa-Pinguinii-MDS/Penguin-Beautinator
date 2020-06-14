import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {FcCalendar} from 'react-icons/fc';

const TimePickButton = (props) => {
    return (
        <Button className={'TimePickButton'} disabled={props.disabled} onClick={props.openCalendarPage}>
            <FcCalendar className={'fc'}/>
            <p className={'datePick'}>Alege data</p>
        </Button>
    )
}

TimePickButton.propTypes = {
    openCalendarPage: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default TimePickButton;
