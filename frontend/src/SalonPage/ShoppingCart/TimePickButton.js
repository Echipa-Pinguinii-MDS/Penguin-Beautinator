import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const TimePickButton = (props) => {
    return (
        <Button className={'TimePickButton'} disabled={props.disabled} onClick={props.openCalendarPage}>
            📅Alege data
        </Button>
    )
}

TimePickButton.propTypes = {
    openCalendarPage: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default TimePickButton;
