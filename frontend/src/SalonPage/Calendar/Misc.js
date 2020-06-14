import React from 'react';
import PropTypes from 'prop-types';
import {GrNext, GrPrevious} from 'react-icons/gr';

const Month = (props) => {
    const months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
        'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
    return (
        <div className={'Month'}>
            <h2>{months[props.month]}</h2>
            <h2>{props.year}</h2>
        </div>
    )
}

Month.propTypes = {
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
}

export const CalendarTitle = (props) => {
    return (
        <div className={'CalendarTitle'}>
            <GrPrevious onClick={props.previousWeek} className={'gr'}>Saptamana anterioara</GrPrevious>
            <Month month={props.month} year={props.year}/>
            <GrNext onClick={props.nextWeek} className={'gr'}>Saptamana viitoare</GrNext>
        </div>
    )
}

CalendarTitle.propTypes = {
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    previousWeek: PropTypes.func.isRequired,
    nextWeek: PropTypes.func.isRequired
}

const Day = (props) => {
    return (
        <div className={'Day'} onClick={props.isClickable ? () => props.changeSelectedDate(props.dayNo) : null}>
            <h1>{props.day}</h1>
            <h1>{props.dayNo}</h1>
        </div>
    )
}

Day.propTypes = {
    isClickable: PropTypes.bool.isRequired,
    changeSelectedDate: PropTypes.func.isRequired,
    day: PropTypes.string.isRequired,
    dayNo: PropTypes.string.isRequired
}

export const Week = (props) => {
    const days = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica']
    return (
        <div className={'Week'}>
            {days.map((day, index) => {
                let valid = 1 <= props.lastMonday + index && props.lastMonday + index <= props.daysInMonth
                return (
                    <Day key={index}
                         day={day}
                         dayNo={valid ? String(props.lastMonday + index) : '-'}
                         isClickable={(valid)}
                         changeSelectedDate={props.changeSelectedDate}/>
                )
            })}
        </div>
    )
}

Week.propTypes = {
    lastMonday: PropTypes.number.isRequired,
    daysInMonth: PropTypes.number.isRequired,
    changeSelectedDate: PropTypes.func.isRequired
}
