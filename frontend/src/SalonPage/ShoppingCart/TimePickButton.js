import React from 'react';
import {Button} from "react-bootstrap";

const TimePickButton = (props) => {
    return (
        <Button onClick={props.openCalendarPage}>
            Alege o data
        </Button>
    )
}

export default TimePickButton;
