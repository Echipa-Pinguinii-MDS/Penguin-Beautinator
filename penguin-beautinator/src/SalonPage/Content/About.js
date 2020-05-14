import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
    return (
        <section className={'About'}>
            <h3 className={'Section-title'}>{props.title}</h3>
            <p className={'Section-description'}>{props.description}</p>
        </section>
    )
};

About.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default About;
