import React from 'react';
import PropTypes from 'prop-types';

const TimeSlots = (props) => {
    return (
        <div className={'TimeSlots'}>
            {props.timeSlots.map(timeSlot =>
                <p key={timeSlot}>{timeSlot}</p>
            )}
        </div>
    )
}

TimeSlots.propTypes = {
    timeSlots: PropTypes.array.isRequired
}

const AvailableSlots = (props) => {
    return (
        <div className={'AvailableSlots'}>
            {props.timeSlots.length === 0 &&
                <p>Nu exista ore libere pentru data si serviciile selectate</p>}
            {props.timeSlots.length > 0 &&
                <TimeSlots timeSlots={props.timeSlots}/>
            }
        </div>
    )
}

AvailableSlots.propTypes = {
    timeSlots: PropTypes.array.isRequired
}

export default AvailableSlots;
