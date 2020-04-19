import React from "react";
import PropTypes from "prop-types";

const Title = (props) => {
    return (
        <section className={'Title'}>
            <h2>{props.name}</h2>
        </section>
    )
};

Title.propTypes = {
    name: PropTypes.string.isRequired
};

export default Title;
