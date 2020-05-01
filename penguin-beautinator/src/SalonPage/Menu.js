import React from 'react';
import Item from '../Universal/Item';

const Menu = (props) => {
    return(
        <div className={'Menu'}>
            <img src={props.logo} className={'Logo'} alt={''}/>
            {Object.keys(props.sections).map((key, index) =>
                <Item key={index} section={props.sections[key]} />
            )}
        </div>
    )
};

Menu.defaultProps = {
    logo: ''
};

export default Menu;
