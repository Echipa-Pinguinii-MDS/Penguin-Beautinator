import React from "react";
import PropTypes from "prop-types";

const About = (props) => {
    return (
        <section className={'About'}>
            <h3>{props.description ? props.title : ''}</h3>
            <p>{props.description}</p>
        </section>
    )
};

About.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string
};

export default About;
