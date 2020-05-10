import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu.js';
import Content from './Content';
import './SalonPage.css';

const SalonPage = (props) => {
    return (
        <article className={'SalonPage'}>
            <Menu sections={props.sections} logo={props.salon.src}/>
            <div className={'VerticalLine'}/>
            <Content sections={props.sections} salon={props.salon}/>
        </article>
    )
}

SalonPage.defaultProps = {
    sections: {about: 'Despre noi', services: 'Servicii', gallery: 'Galerie', contact: 'Contact'}
}

SalonPage.propTypes = {
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
    salon: PropTypes.shape({
        src: PropTypes.string,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        services: PropTypes.array.isRequired,
        images: PropTypes.array,
        program: PropTypes.array.isRequired,
        phone: PropTypes.array.isRequired,
        email: PropTypes.array.isRequired,
        address: PropTypes.string.isRequired
    }).isRequired
}

export default SalonPage;
