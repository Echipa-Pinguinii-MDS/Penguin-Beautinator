import React from 'react';
import PropTypes from 'prop-types';

const Contact = (props) => {
    return (
        <section className={'Contact'}>
            <h3 className={'Section-title'}>{props.title}</h3>
            <h5>Program de lucru: {props.program.join(', ')}</h5>
            <h5>Telefon: {props.phone.join('/ ')}</h5>
            <h5>E-mail: {props.email.join(', ')}</h5>
            <h5>Adresa: {props.address}</h5>
        </section>
    )
};

Contact.propTypes = {
    title: PropTypes.string.isRequired,
    program: PropTypes.array.isRequired,
    phone: PropTypes.array.isRequired,
    email: PropTypes.array.isRequired,
    address: PropTypes.string.isRequired
};

export default Contact;