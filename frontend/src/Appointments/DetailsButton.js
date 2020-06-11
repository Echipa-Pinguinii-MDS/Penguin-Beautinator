import React from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import PropTypes from 'prop-types';

const DetailsButton = (props) => {
    return (
        <div className={'DetailsButton'}
             onClick={props.triggerButton}>
            {props.opened &&
                <IoIosArrowUp className={'io'}/>}
            {!props.opened &&
                <IoIosArrowDown className={'io'}/>}
            <p>Detalii</p>
        </div>
    )
}

DetailsButton.propTypes = {
    triggerButton: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired
}

export default DetailsButton;
