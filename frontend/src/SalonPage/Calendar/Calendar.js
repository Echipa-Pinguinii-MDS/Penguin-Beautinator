import React from 'react';
import {CalendarTitle, Week} from './Misc';
import AvailableSlots from './AvailableSlots';
import './Calendar.css'

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastMonday: new Date().getDate() - new Date().getDay() + (new Date().getDay() === 0 ? -6 : 1),
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }
        this.changeSelectedDate = this.changeSelectedDate.bind(this);
        this.daysInMonth = this.daysInMonth.bind(this);
        this.daysInPreviousMonth = this.daysInPreviousMonth.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
    }

    changeSelectedDate(day) {
        this.setState({
            day: day
        })
        this.props.setTime(null)
        this.props.setDate(day + '.' + this.state.month + '.' + this.state.year)
    }

    daysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate()
    }

    daysInPreviousMonth(year, month) {
        if (month === 0) {
            year -= 1
            month = 11
        } else {
            month -= 1
        }
        return this.daysInMonth(year, month)
    }

    nextWeek() {
        let daysInMonth = this.daysInMonth(this.state.year, this.state.month)
        let endDay = new Date(this.state.year, this.state.month, daysInMonth).getDay()

        if (this.state.lastMonday + 7 > daysInMonth) {
            this.setState(state => ({
                lastMonday: -endDay + 1,
                day: 1,
                month: (state.month + 1) % 12,
                year: state.year + (state.month === 11)
            }))
        } else {
            this.setState(state => ({
                lastMonday: state.lastMonday + 7,
                day: state.lastMonday + 7
            }))
        }
    }

    previousWeek() {
        let daysInPreviousMonth = this.daysInPreviousMonth(this.state.year, this.state.month)

        if (this.state.lastMonday <= 0) {
            this.setState(state => ({
                lastMonday: daysInPreviousMonth + state.lastMonday,
                day: daysInPreviousMonth + state.lastMonday,
                month: (state.month + 11) % 12,
                year: state.year - (state.month === 0)
            }))
        } else if (this.state.lastMonday === 1) {
            this.setState(state => ({
                lastMonday: daysInPreviousMonth - 6,
                day: daysInPreviousMonth - 6,
                month: (state.month + 11) % 12,
                year: state.year - (state.month === 0)
            }))
        } else {
            this.setState(state => ({
                lastMonday: state.lastMonday - 7,
                day: Math.max(1, state.lastMonday - 7)
            }))
        }
    }

    render() {
        return (
            <div className={'Calendar'}>
                <CalendarTitle year={this.state.year}
                               month={this.state.month}
                               previousWeek={this.previousWeek}
                               nextWeek={this.nextWeek}/>
                <Week lastMonday={this.state.lastMonday}
                      daysInMonth={this.daysInMonth(this.state.year, this.state.month)}
                      date={this.state.day}
                      changeSelectedDate={this.changeSelectedDate}/>
                <AvailableSlots timeSlots={this.state.day >= new Date().getDate() ?
                    ['11:00', '12:05', '13:00', '13:30'] : []}
                                month={this.state.month}
                                year={this.state.year}
                                setTime={this.props.setTime}/>
                </div>
        )
    }
}

export default Calendar;
