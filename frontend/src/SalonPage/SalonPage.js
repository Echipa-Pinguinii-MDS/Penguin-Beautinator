import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu.js';
import Content from './Content';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import Calendar from './Calendar/Calendar';
import {salonServices, addAppointment} from '../Universal/Queries';
import './SalonPage.css';
import Cookies from "js-cookie";

class SalonPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salon: props.salon,
            services: {},
            sections: props.sections,
            selected: new Set(),
            calendarPage: false,
            time: null,
            date: null
        }
        this.hasContent = this.hasContent.bind(this)
        this.addService = this.addService.bind(this)
        this.deleteService = this.deleteService.bind(this)
        this.openCalendarPage = this.openCalendarPage.bind(this)
        this.closeCalendarPage = this.closeCalendarPage.bind(this)
        this.setTime = this.setTime.bind(this)
        this.setDate = this.setDate.bind(this)
        this.getServicesId = this.getServicesId.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.refreshServices()
    }

    refreshServices = () => {
        salonServices(this.state.salon.id).then(result =>
            this.setState({
                services: result
            }))
    }

    hasContent(section, salon) {
        return !((section === 'about' && salon.description === '') ||
            (section === 'gallery' && salon.images.size === 0))
    }

    addService(id) {
        this.setState(state => ({
            selected: state.selected.add(id)
        }))
    }

    deleteService(id) {
        let selected = this.state.selected
        selected.delete(id)

        this.setState({
            selected: selected
        })

        if (selected.size === 0) {
            this.setState({
                calendarPage: false
            })
        }
    }

    getServices() {
        let services = {}
        Object.keys(this.state.services).map(category => {
            let list = []
            this.state.services[category].map(service =>
                this.state.selected.has(service.id) ? list.push(service) : null
            )
            if (list.length)
                services[category] = list
        })
        return services
    }

    getServicesId() {
        let services = []
        Object.keys(this.state.services).map(category => {
            this.state.services[category].map(service =>
                this.state.selected.has(service.id) ? services.push(service.id) : null
            )
        })
        console.log("heeii ", services)
        return services
    }

    handleSubmit() {
        let userId = Cookies.get('user_id')
        userId = Number(userId.substring(1, userId.length))
        addAppointment(
            this.getServicesId(),
            this.state.salon.id,
            userId,
            this.state.day,
            this.state.time).then(result => {})
    }

    openCalendarPage() {
        this.setState({
            calendarPage: true
        })
    }

    closeCalendarPage() {
        this.setState({
            calendarPage: false
        })
    }

    setTime(time) {
        this.setState({
            time: time
        })
    }

    setDate(date) {
        this.setState({
            date: date
        })
    }

    render() {
        return (
            <article className={'SalonPage'}>
                {!this.state.calendarPage &&
                <Menu sections={this.state.sections}
                      salon={this.state.salon}
                      hasContent={this.hasContent}/>}

                {!this.state.calendarPage &&
                <Content sections={this.state.sections}
                         salon={this.state.salon}
                         services={this.state.services}
                         hasContent={this.hasContent}
                         handleClick={this.addService}
                         selected={this.state.selected}/>}

                {this.state.calendarPage &&
                <Calendar setTime={this.setTime}
                          setDate={this.setDate}
                          services={this.getServicesId()}
                          salonId={this.state.salon.id}
                />}

                <ShoppingCart services={this.getServices()}
                              handleClick={this.deleteService}
                              calendarPage={this.state.calendarPage}
                              openCalendarPage={this.openCalendarPage}
                              closeCalendarPage={this.closeCalendarPage}
                              disabled={this.state.time == null}
                              data={this.state.date + ', ora ' + this.state.time + ' la ' + this.state.salon.name}
                              handleSubmit={this.handleSubmit}/>
            </article>
        )
    }
}

SalonPage.propTypes = {
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
    salon: PropTypes.object.isRequired
}

export default SalonPage;
