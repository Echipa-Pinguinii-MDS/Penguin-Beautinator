import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = (props) => {
    return (
        <div className={'InfoCard'}>
            <div id={'di2'}>{props.name}</div>
            <div id={'di4'}>{props.address}</div>
            <div id={'di5'}>{props.description}</div>
            <div id={'di6'}>{props.services}</div>
        </div>
    )
}

InfoCard.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired
}

export default InfoCard;
