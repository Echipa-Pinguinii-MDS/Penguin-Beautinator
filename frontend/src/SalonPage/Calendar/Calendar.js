import React from 'react';
import {CalendarTitle, Week} from './Misc';
import AvailableSlots from './AvailableSlots';
import './Calendar.css';
import {availableHours} from '../../Universal/Queries';

class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lastMonday: new Date().getDate() - new Date().getDay() + (new Date().getDay() === 0 ? -6 : 1),
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            availableSlots: [],
            services: props.services,
            salonId: props.salonId
        }
        this.changeSelectedDate = this.changeSelectedDate.bind(this)
        this.daysInMonth = this.daysInMonth.bind(this)
        this.daysInPreviousMonth = this.daysInPreviousMonth.bind(this)
        this.nextWeek = this.nextWeek.bind(this)
        this.previousWeek = this.previousWeek.bind(this)
        this.getRelativeDate = this.getRelativeDate.bind(this)
        this.refreshSlots = this.refreshSlots.bind(this)
        this.getDate = this.getDate.bind(this)
    }

    componentDidMount() {
        this.refreshSlots()
    }

    refreshSlots(day) {
        if (day === undefined) {
            day = this.state.day;
        }
        availableHours(
            this.state.services,
            this.state.salonId,
            this.getDate(day)).then(result => {
                this.setState({availableSlots: result, day: day})
            })
    }

    getDate(day) {
        let date = this.state.year + '-'
        let month = this.state.month + 1
        if (month < 10) {
            date = date + '0'
        }
        date = date + month + '-'
        if (day < 10) {
            date = date + '0'
        }
        date = date + day;
        return date;
    }

    changeSelectedDate(day) {
        this.props.setTime(null)
        this.props.setDate(this.getDate(day))
        this.refreshSlots(day)
    }

    getRelativeDate() {
        let date = new Date()

        if (this.state.year === date.getFullYear()) {
            if (this.state.month === date.getMonth()) {
                if (this.state.day == date.getDate()) {
                    return 0
                } else if (this.state.day > date.getDate()) {
                    return 1
                }
            } else if (this.state.month > date.getMonth()) {
                return 1
            }
        } else if (this.state.year > date.getFullYear()) {
            return 1
        }

        return -1
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

                {this.getRelativeDate() === 1 &&
                <AvailableSlots timeSlots={this.state.availableSlots}
                                month={this.state.month}
                                year={this.state.year}
                                setTime={this.props.setTime}/>}

                {this.getRelativeDate() === 0 &&
                <p className={'AvailableSlots'}>Pentru data de astazi se mai pot realiza doar programari telefonice</p>}

                {this.getRelativeDate() === -1 &&
                <p className={'AvailableSlots'}>Nu exista ore libere pentru data si serviciile selectate</p>}
            </div>
        )
    }
}

export default Calendar;
