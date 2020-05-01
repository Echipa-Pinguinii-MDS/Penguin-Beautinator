import React from 'react';
import PropTypes from 'prop-types';
import SalonInfo from './SalonInfo';

const InfoCard = (props) => {
    return (
        <div className={'InfoCard'}>
            <img src={props.src}
                 alt={''}/>
            <SalonInfo name={props.name}
                      address={props.address}
                      description={props.description}
                      services={props.services}/>
        </div>
    )
}

InfoCard.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired
}

export default InfoCard;
