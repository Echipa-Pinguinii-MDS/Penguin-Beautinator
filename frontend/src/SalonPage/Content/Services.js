import React from 'react';
import {GrFormCheckmark} from 'react-icons/gr';
import PropTypes from 'prop-types';

// alternativ: GrFormAdd

const Info = (props) => {
    return (
        <div className={'Info'}>
            <GrFormCheckmark className={'gr'} onClick={() => props.handleClick(props.id)}/>
            <p>{props.title}</p>
            <p>{props.price} lei</p>
            <p>{props.length} minute</p>
        </div>
    )
}

Info.propTypes = {
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired
}

const Section = (props) => {
    return (
        <div className={'Services-infos'}>
            <h4>{props.category}</h4>
            {props.service.map(service =>
                <Info key={service.id}
                      handleClick={props.handleClick}
                      id={service.id}
                      title={service.title}
                      price={service.price}
                      length={service.length}/>
            )}
        </div>
    )
}

Section.propTypes = {
    handleClick: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    service: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired
    }).isRequired).isRequired
}

const Services = (props) => {
    return (
        <section className={'Services'}>
            <h3 className={'Section-title'}>{props.title}</h3>
            <div className={'Services-categories'}>
                {Object.keys(props.services).map(category =>
                    <Section key={category}
                             handleClick={props.handleClick}
                             service={props.services[category]}
                             category={category}/>
                )}
            </div>
        </section>
    )
}

Services.propTypes = {
    handleClick: PropTypes.func.isRequired,
    services: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired
    }).isRequired).isRequired).isRequired
}

export default Services;
