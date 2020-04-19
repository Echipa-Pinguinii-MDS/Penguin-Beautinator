import React from 'react';
import PropTypes from 'prop-types';

const Info = (props) => {
    return (
        <label className={'Info'}>
            <input type='checkbox'/>
            <h4>{props.title}</h4>
            <h4>{props.price} lei</h4>
            <h4>{props.length} minute</h4>
        </label>
    )
};

Info.propTypes ={
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
};

const Services = (props) => {
    return (
        <section className={'Services'}>
            <h3 className={'Section-title'}>{props.title}</h3>
            <form className={'Services-infos'}>
                {props.services.map((service, index) =>
                    <Info key={index}
                          title={service.title}
                          price={service.price}
                          length={service.length}/>
                    )}
            </form>
        </section>
    )
};

Services.propTypes = {
    title: PropTypes.string.isRequired,
    services: PropTypes.array.isRequired
};

export default Services;
