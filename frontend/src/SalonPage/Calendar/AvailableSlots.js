import React from 'react';
import PropTypes from 'prop-types';

const TimeSlots = (props) => {
    return (
        <div className={'TimeSlots'}>
            {props.timeSlots.map(timeSlot =>
                <p key={timeSlot + '.' + props.month + '.' + props.year}
                   onClick={() => props.setTime({timeSlot}.timeSlot)}>{timeSlot}</p>
            )}
        </div>
    )
}

TimeSlots.propTypes = {
    timeSlots: PropTypes.array.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    setTime: PropTypes.func.isRequired
}

const AvailableSlots = (props) => {
    return (
        <div className={'AvailableSlots'}>
            {props.timeSlots.length === 0 &&
                <p>Nu exista ore libere pentru data si serviciile selectate</p>}
            {props.timeSlots.length > 0 &&
                <TimeSlots timeSlots={props.timeSlots}
                           month={props.month}
                           year={props.year}
                           setTime={props.setTime}/>}
        </div>
    )
}

AvailableSlots.propTypes = {
    timeSlots: PropTypes.array.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    setTime: PropTypes.func.isRequired
}

export default AvailableSlots;
