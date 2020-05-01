import React from 'react';
import PropTypes from 'prop-types';
import InfoCard from './InfoCard';
import Review from './Review';

const SalonCard = (props) => {
    return (
        <div className={'SalonCard'}>
            <InfoCard src={props.src}
                      name={props.name}
                      address={props.address}
                      description={props.description}
                      services={props.services}/>
            <Review noFullStars={props.noFullStars}
                    noReviews={props.noReviews}
                    noDollars={props.noDollars}/>
        </div>
    )
}

SalonCard.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired,
    noFullStars: PropTypes.number.isRequired,
    noReviews: PropTypes.number.isRequired,
    noDollars: PropTypes.number.isRequired
}

export default SalonCard;
