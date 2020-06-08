import React from 'react';
import './Calendar.css'

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
        <div className={'Day'}>
            <h1>{props.day}</h1>
            <h1 onClick={() => props.changeSelectedDate(props.dayNo)}>{props.dayNo}</h1>
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
        console.log(this.state.day)
        console.log(this.state.month)
        const date = new Date()
        const lastMonday = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
        return (
            <div className={'Calendar'}>
                <Month year={this.state.year} month={this.state.month}/>
                <Week lastMonday={lastMonday} date={this.state.day} changeSelectedDate={this.changeSelectedDate}/>
                <p>Nu exista sloturi libere pentru data de {this.state.day}.{this.state.month}.{this.state.year}</p>
            </div>
        )
    }
}

export default Calendar;
