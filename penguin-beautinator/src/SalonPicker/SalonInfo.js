import React from 'react';
import PropTypes from 'prop-types';

const SalonInfo = (props) => {
    return (
        <div className={'SalonInfo'}>
            <div id={'di2'}>{props.name}</div>
            <div id={'di4'}>{props.address}</div>
            <div id={'di5'}>{props.description}</div>
        </div>
    )
}

SalonInfo.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default SalonInfo;
