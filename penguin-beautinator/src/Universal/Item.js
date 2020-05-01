import PropTypes from 'prop-types';
import React from 'react';

const Item = (props) => {
    return (
        <div className={'Item'}>
            <img className={props.className} src={props.src} alt={''}/>
            <a href={props.href}>{props.section}</a>
        </div>
    )
};

Item.propTypes = {
    section: PropTypes.string.isRequired,
    className: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.string
};

export default Item;
