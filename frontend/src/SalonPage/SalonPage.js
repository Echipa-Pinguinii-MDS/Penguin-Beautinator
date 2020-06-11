import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu.js';
import Content from './Content';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import Calendar from './Calendar/Calendar';
import './SalonPage.css';

class SalonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: new Set(),
            calendarPage: false,
            time: null,
            date: null
        }
        this.hasContent = this.hasContent.bind(this);
        this.addService = this.addService.bind(this);
        this.deleteService = this.deleteService.bind(this);
        this.openCalendarPage = this.openCalendarPage.bind(this);
        this.closeCalendarPage = this.closeCalendarPage.bind(this);
        this.setTime = this.setTime.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    hasContent(section, salon) {
        return !((section === 'about' && salon.description === '') ||
            (section === 'gallery' && salon.images.length === 0));
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
        Object.keys(this.props.services).map(category => {
            let list = []
            this.props.services[category].map(service => {
                if (this.state.selected.has(service.id)) {
                    list.push(service)
                }
            })
            if (list.length)
                services[category] = list
        })
        return services;
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
                <Menu sections={this.props.sections}
                      salon={this.props.salon}
                      hasContent={this.hasContent}/>}
                {!this.state.calendarPage &&
                <Content sections={this.props.sections}
                         salon={this.props.salon}
                         services={this.props.services}
                         hasContent={this.hasContent}
                         handleClick={this.addService}
                         selected={this.state.selected}/>}
                {this.state.calendarPage &&
                <Calendar setTime={this.setTime}
                          setDate={this.setDate}/>}
                <ShoppingCart services={this.getServices()}
                              handleClick={this.deleteService}
                              calendarPage={this.state.calendarPage}
                              openCalendarPage={this.openCalendarPage}
                              closeCalendarPage={this.closeCalendarPage}
                              disabled={this.state.time == null}
                              data={this.state.date + ', ora ' + this.state.time + ' la ' + this.props.salon.name}/>
            </article>
        )
    }
}

SalonPage.propTypes = {
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
    salon: PropTypes.object.isRequired,
    services: PropTypes.objectOf(PropTypes.array).isRequired
}

export default SalonPage;
