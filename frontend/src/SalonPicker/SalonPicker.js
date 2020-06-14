import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SalonCard from './SalonCard';
import './SalonPicker.css';

const SalonPicker = (props) => {
    return (
        <div className={'SalonPicker'}>
            {props.salons.map(salon =>
                <Link key={salon.id} to={salon.name + salon.id}>
                    <SalonCard src={salon.src}
                               name={salon.name}
                               address={salon.address}
                               description={salon.description}
                               noFullStars={salon.noFullStars}
                               noReviews={salon.noReviews}
                               noDollars={salon.noDollars}/>
                </Link>
            )}
        </div>
    )
}

SalonPicker.propTypes = {
    salons: PropTypes.array.isRequired
}

export default SalonPicker;
