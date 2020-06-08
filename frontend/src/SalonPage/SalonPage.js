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
            calendarPage: false
        }
        this.hasContent = this.hasContent.bind(this);
        this.addService = this.addService.bind(this);
        this.deleteService = this.deleteService.bind(this);
        this.openCalendarPage = this.openCalendarPage.bind(this);
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
    }

    getServices() {
        let services = {}
        Object.keys(this.props.services).map(category => {
            let list = []
            this.props.services[category].map(service => {
                if (this.state.selected.has(service.id))
                    list.push(service)
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

    render() {
        return (
            <article className={'SalonPage'}>
                {!this.state.calendarPage &&
                <Menu sections={this.props.sections}
                      salon={this.props.salon}
                      hasContent={this.hasContent}/>}
                {!this.state.calendarPage &&
                <div className={'VerticalLine'}/>}
                {!this.state.calendarPage &&
                <Content sections={this.props.sections}
                         salon={this.props.salon}
                         services={this.props.services}
                         hasContent={this.hasContent}
                         handleClick={this.addService}/>}
                {this.state.calendarPage &&
                <Calendar/>}
                {this.state.selected.size > 0 &&
                <div className={'VerticalLine'}/>}
                {this.state.selected.size > 0 &&
                <ShoppingCart services={this.getServices()}
                              handleClick={this.deleteService}
                              calendarPage={this.state.calendarPage}
                              openCalendarPage={this.openCalendarPage}/>}
            </article>
        )
    }
}

SalonPage.propTypes = {
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
    salon: PropTypes.shape({
        src: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,
        program: PropTypes.array.isRequired,
        phone: PropTypes.array.isRequired,
        email: PropTypes.array.isRequired,
        address: PropTypes.string.isRequired
    }).isRequired,
    services: PropTypes.objectOf(PropTypes.array).isRequired
}

export default SalonPage;
