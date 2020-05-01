import React from 'react';
import PropTypes from 'prop-types';
import PriceRange from './PriceRange';
import Review from './Review';

const InfoCard = (props) => {
    return (
        <div>
            <div id={'di2'}>{props.name}</div>
            <div id={'di4'}>{props.address}</div>
            <div id={'di5'}>{props.description}</div>
            <div id={'di6'}>{props.services}</div>
            <PriceRange noDollars={props.noDollars}/>
            <Review noFullStars={props.noFullStars} noReviews={props.noReviews}/>
        </div>
    )
}

InfoCard.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired,
    noDollars: PropTypes.number.isRequired,
    noFullStars: PropTypes.number.isRequired,
    noReviews: PropTypes.number.isRequired
}

export default InfoCard;
