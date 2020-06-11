import React from 'react';
import PropTypes from 'prop-types';

const AppointmentCategory = (props) => {
    return (
        <div className={'AppointmentServices'}>
            <p className={'AppointmentCategory'}>{props.category + ': '}</p>
            <p className={'AppointmentService'}>{props.services.join(', ')}</p>
        </div>
    )
}

AppointmentCategory.propTypes = {
    category: PropTypes.string.isRequired,
    services: PropTypes.array.isRequired
}

const AppointmentDetails = (props) => {
    return (
        <div className={'AppointmentDetails'}>
            {Object.keys(props.services).map(category =>
                <AppointmentCategory key={category}
                                     category={category}
                                     services={props.services[category]}/>)}
        </div>
    )
}

AppointmentDetails.propTypes = {
    services: PropTypes.object.isRequired
}

export default AppointmentDetails;
