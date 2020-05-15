import React from 'react';
import PropTypes from 'prop-types';

const Info = (props) => {
    return (
        <div className={'Info'}>
            <p>{props.title}</p>
            <p>{props.price} lei</p>
            <p>{props.length} minute</p>
        </div>
    )
}

Info.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired
}

const Section = (props) => {
    return (
        <div className={'Services-infos'}>
            <h4>{props.category}</h4>
            {props.service.map(service =>
                <Info key={service.title}
                      title={service.title}
                      price={service.price}
                      length={service.length}/>
            )}
        </div>
    )
}

Section.propTypes = {
    category: PropTypes.string.isRequired,
    service: PropTypes.array.isRequired
}

const Services = (props) => {
    return (
        <section className={'Services'}>
            <h3 className={'Section-title'}>{props.title}</h3>
            <div className={'Services-categories'}>
                {Object.keys(props.services).map(category =>
                    <Section key={category} service={props.services[category]} category={category}/>
                )}
            </div>
        </section>
    )
}

Services.propTypes = {
    title: PropTypes.string.isRequired,
    services: PropTypes.objectOf(PropTypes.array).isRequired
}

export default Services;