import React from 'react';
import PropTypes from 'prop-types';
import SalonCard from './SalonCard';
import './SalonPicker.css';

const SalonPicker = (props) => {
    return (
        <div className={'SalonPicker'}>
            {props.salons.map((salon, index) =>
                <SalonCard key={index}
                           src={salon.src}
                           name={salon.name}
                           address={salon.address}
                           description={salon.description}
                           services={salon.services}
                           noFullStars={salon.noFullStars}
                           noReviews={salon.noReviews}
                           noDollars={salon.noDollars}
                />
            )}
        </div>
    )
}

SalonPicker.propTypes = {
    salons: PropTypes.array.isRequired
}

export default SalonPicker;
