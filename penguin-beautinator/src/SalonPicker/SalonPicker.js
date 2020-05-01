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

SalonPicker.defaultProps = {
    salons: [{
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
        name: 'Nume',
        address: 'Adresa',
        description: 'Descriere',
        services: 'Coafor / Epilat / Masaj / Manipedi',
        noFullStars: 3,
        noReviews: 1,
        noDollars: 2
    }]
}

SalonPicker.propTypes = {
    salons: PropTypes.array.isRequired
}

export default SalonPicker;
