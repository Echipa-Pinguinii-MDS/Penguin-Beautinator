import React from 'react';
import Item from '../Universal/Item';
import PropTypes from "prop-types";

const Menu = (props) => {
    return(
        <div className={'Menu'}>
            {props.logo !== '' && <img src={props.logo} className={'Logo'} alt={'Salon logo'}/>}
            {Object.keys(props.sections).map((key, index) =>
                <Item key={index} section={props.sections[key]} />
            )}
        </div>
    )
}

Menu.propTypes = {
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
    logo: PropTypes.string.isRequired
}

export default Menu;
