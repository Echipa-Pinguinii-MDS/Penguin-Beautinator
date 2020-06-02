import React from 'react';
import {GrFormClose} from 'react-icons/gr';
import PropTypes from 'prop-types';

const Info = (props) => {
    return (
        <div className={'Info'}>
            <p>{props.title}</p>
            <p>{props.price} lei</p>
            <GrFormClose className={'gr'}/>
        </div>
    )
}

Info.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

const Section = (props) => {
    return (
        <div className={'Section'}>
            <h5>{props.category}</h5>
            {props.service.map(service =>
                <Info key={service.id}
                      title={service.title}
                      price={service.price}/>
            )}
        </div>
    )
}

Section.propTypes = {
    category: PropTypes.string.isRequired,
    service: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired).isRequired
}

const Services = (props) => {
    return (
        <div className={'Services'}>
            {Object.keys(props.services).map(category =>
                <Section key={category} service={props.services[category]} category={category}/>
            )}
        </div>
    )
}

Services.propTypes = {
    services: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired
    }).isRequired).isRequired).isRequired
}

export default Services;
