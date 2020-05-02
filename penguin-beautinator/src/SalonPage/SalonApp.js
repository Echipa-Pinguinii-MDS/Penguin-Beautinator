import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu.js';
import Content from './Content';
import './SalonApp.css';

const SalonApp = (props) => {
    return (
        <article className={'SalonApp'}>
            <Menu sections={props.sections}/>
            <div className={'VerticalLine'}/>
            <Content name={props.name}
                     sections={props.sections}
                     description={props.description}
                     services={props.services}
                     images={props.images}
                     program={props.program}
                     phone={props.phone}
                     email={props.email}
                     address={props.address}/>
        </article>
    )
}

SalonApp.defaultProps = {
    sections: {about: 'Despre noi', services: 'Servicii', gallery: 'Galerie', contact: 'Contact'}
}

SalonApp.propTypes = {
    sections: PropTypes.array,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    services: PropTypes.array.isRequired,
    images: PropTypes.array,
    program: PropTypes.array.isRequired,
    phone: PropTypes.array.isRequired,
    email: PropTypes.array.isRequired,
    address: PropTypes.string.isRequired
}

export default SalonApp;
