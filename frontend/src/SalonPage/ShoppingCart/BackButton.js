import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const BackButton = (props) => {
    return (
        <Button className={'BackButton'} onClick={props.closeCalendarPage}>
            Inapoi la selectarea serviciilor
        </Button>
    )
}

BackButton.propTypes = {
    closeCalendarPage: PropTypes.func.isRequired
}

export default BackButton;
