import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
    return (
        <div className={'Logo'}>
            <img src={props.logo} alt={'logo'}/>
        </div>
    )
};

Logo.defaultProps = {
    logo: ''
};

const Item = (props) => {
    return (
        <div className={'Item'}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>{props.section}</a>
        </div>
    )
};

Item.propTypes = {
    section: PropTypes.string.isRequired
};

const Menu = (props) => {
    return(
        <div className={'Menu'}>
            <Logo/>
            {Object.keys(props.sections).map((key, index) =>
                <Item key={index} section={props.sections[key]} />
            )}
        </div>
    )
};

export default Menu;
