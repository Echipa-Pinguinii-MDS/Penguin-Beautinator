import React from 'react';
import PropTypes from 'prop-types';
import AppointmentCard from './AppointmentCard';
import DetailsButton from './DetailsButton';
import AppointmentDetails from './AppointmentDetails';

class Appointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
        this.triggerButton = this.triggerButton.bind(this)
    }

    triggerButton() {
        this.setState(state => ({
            opened: !state.opened
        }))
    }
    render()
    {
        return (
            <div className={'Appointment'}>
                <AppointmentCard appointment={this.props.appointment}/>
                <DetailsButton triggerButton={this.triggerButton}
                               opened={this.state.opened}/>
                {this.state.opened &&
                    <AppointmentDetails services={this.props.appointment.services}/>}
            </div>
        )
    }
}

Appointment.propTypes = {
    appointment: PropTypes.object.isRequired
}

export default Appointment;
