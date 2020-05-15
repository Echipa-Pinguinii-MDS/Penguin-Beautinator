import React from 'react';
import PropTypes from 'prop-types';
import Review from '../../SalonPicker/Review';

const Title = (props) => {
    return (
        <section className={'Title'}>
            <h2>{props.name}</h2>
            <Review noFullStars={props.noFullStars} noReviews={props.noReviews} noDollars={props.noDollars}/>
        </section>
    )
};

Title.propTypes = {
    name: PropTypes.string.isRequired,
    noFullStars: PropTypes.number.isRequired,
    noReviews: PropTypes.number.isRequired,
    noDollars: PropTypes.number.isRequired
};

export default Title;