import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu.js';
import Content from './Content';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import './SalonPage.css';

function SalonPage (props) {
    function hasContent(section, salon) {
        return !((section === 'about' && salon.description === '') ||
            (section === 'gallery' && salon.images.length === 0));
    }

    return (
        <article className={'SalonPage'}>
            <Menu sections={props.sections} salon={props.salon} hasContent={hasContent}/>
            <div className={'VerticalLine'}/>
            <Content sections={props.sections} salon={props.salon} services={props.services} hasContent={hasContent}/>
            <div className={'VerticalLine'}/>
            <ShoppingCart/>
        </article>
    )
}

SalonPage.propTypes = {
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
    salon: PropTypes.shape({
        src: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,
        program: PropTypes.array.isRequired,
        phone: PropTypes.array.isRequired,
        email: PropTypes.array.isRequired,
        address: PropTypes.string.isRequired
    }).isRequired,
    services: PropTypes.objectOf(PropTypes.array).isRequired
}

export default SalonPage;
