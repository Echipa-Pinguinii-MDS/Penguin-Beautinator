import React from 'react';
import PropTypes from 'prop-types';
import InfoCard from './InfoCard';

const SalonCard = (props) => {
    return (
        <div>
            <img src={props.src} alt={''}/>
            <InfoCard name={props.name}
                      address={props.address}
                      description={props.description}
                      services={props.services}
                      noDollars={props.noDollars}
                      noFullStars={props.noFullStars}
                      noReviews={props.noReviews}/>
        </div>
    )
}

SalonCard.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired,
    noDollars: PropTypes.number.isRequired,
    noFullStars: PropTypes.number.isRequired,
    noReviews: PropTypes.number.isRequired
}

export default SalonCard;
