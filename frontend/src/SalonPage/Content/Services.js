import React from 'react';
import PropTypes from 'prop-types';
import {GrFormCheckmark, GrFormAdd} from 'react-icons/gr';

const Info = (props) => {
    return (
        <div className={'Info'} onClick={() => props.handleClick(props.id)}>
            {props.selected.has(props.id) &&
            <GrFormCheckmark className={'gr'}/>}

            {!props.selected.has(props.id) &&
            <GrFormAdd className={'gr'}/>}

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
    length: PropTypes.number.isRequired,
    selected: PropTypes.object.isRequired
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
                      length={service.length}
                      selected={props.selected}/>
            )}
        </div>
    )
}

Section.propTypes = {
    handleClick: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    service: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired
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
                             category={category}
                             selected={props.selected}/>
                )}
            </div>
        </section>
    )
}

Services.propTypes = {
    handleClick: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired
}

export default Services;
