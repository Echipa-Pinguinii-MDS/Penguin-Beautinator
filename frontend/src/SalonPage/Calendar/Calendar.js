import React from 'react';
import './Calendar.css'
import AvailableSlots from "./TimeSlots";

const Month = (props) => {
    const months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
        'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
    return (
        <div>
            <h1>{months[props.month] + ' ' + props.year}</h1>
        </div>
    )
}

const Day = (props) => {
    return (
        <div className={'Day'} onClick={() => props.changeSelectedDate(props.dayNo)}>
            <h1>{props.day}</h1>
            <h1>{props.dayNo}</h1>
        </div>
    )
}

const Week = (props) => {
    const days = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica']
    return (
        <div className={'Week'}>
            {days.map((day, index) =>
                <Day key={index}
                     day={day}
                     dayNo={props.lastMonday + index}
                     changeSelectedDate={props.changeSelectedDate}/>
            )}
        </div>
    )
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        }
        this.changeSelectedDate = this.changeSelectedDate.bind(this);
    }

    changeSelectedDate(day) {
        this.setState({
            day: day
        })
    }

    render() {
        const date = new Date()
        const lastMonday = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
        return (
            <div className={'Calendar'}>
                <Month year={this.state.year} month={this.state.month}/>
                <Week lastMonday={lastMonday} date={this.state.day} changeSelectedDate={this.changeSelectedDate}/>
                {this.state.day < new Date().getDate() &&
                    <AvailableSlots timeSlots={[]}/>}
                {this.state.day >= new Date().getDate() &&
                    <AvailableSlots timeSlots={['11:00', '12:05', '13:00', '13:30']}/>}
                </div>
        )
    }
}

export default Calendar;
