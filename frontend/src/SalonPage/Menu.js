import React from 'react';
import Scroll from 'react-scroll';
import PropTypes from 'prop-types';

const Menu = (props) => {
    return(
        <div className={'Menu'}>
            {props.salon.src !== '' &&
            <img src={props.salon.src} className={'Logo'} alt={'Salon logo'}/>}

            {Object.keys(props.sections).map(key =>
                props.hasContent(key, props.salon) &&
                <Scroll.Link key={key}
                             to={key}
                             spy={true}
                             smooth={true}
                             duration={500}>
                    <h3>{props.sections[key]}</h3>
                </Scroll.Link>
            )}
        </div>
    )
}

Menu.propTypes = {
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
    }).isRequired
}

export default Menu;
