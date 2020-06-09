import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const TimePickButton = (props) => {
    return (
        <Button className={'TimePickButton'} onClick={props.openCalendarPage}>
            Alege o data
        </Button>
    )
}

TimePickButton.propTypes = {
    openCalendarPage: PropTypes.func.isRequired
}

export default TimePickButton;
