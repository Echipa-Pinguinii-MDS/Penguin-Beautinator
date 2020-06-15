import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

const LastName = (props) => {
    return (
        <div className={'group'}>
            <Form.Label>Nume</Form.Label>
            <Form.Control type='text'
                          name='lastName'
                          value={props.lastName}
                          onChange={props.handleChange}
                          placeholder='Nume'/>
        </div>
    )
}

LastName.propTypes = {
    lastName: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default LastName;
