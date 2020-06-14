import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

const Birthday = (props) => {
    return (
        <Form.Group>
            <Form.Label>Data nasterii</Form.Label>
            <Form.Control type='date'
                          name='date'
                          value={props.birthday}
                          onChange={props.handleChange}
                          placeholder='Data nasterii'/>
        </Form.Group>
    )
}

Birthday.propTypes = {
    birthday: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Birthday;