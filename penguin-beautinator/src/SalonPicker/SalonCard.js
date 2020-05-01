import React from 'react';
import PropTypes from 'prop-types';
import InfoCard from './InfoCard';

const SalonCard = (props) => {
    return (
        <div className={'SalonCard'}>
            <img src={props.src}
                 alt={''}/>
            <InfoCard name={props.name}
                      address={props.address}
                      description={props.description}
                      services={props.services}/>
        </div>
    )
}

SalonCard.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired
}

export default SalonCard;
