import React from "react";
import PropTypes from 'prop-types';

const ContactInfo = (props) => {
    return (
        <div>
            <i className={props.icon} />
            <p>{props.text.join(', ')}</p>
        </div>
    );
};

ContactInfo.defaultProps = {
    icon: ''
};

ContactInfo.propTypes = {
    text: PropTypes.array.isRequired
};

function Footer() {
    return (
        <div>
            <ContactInfo icon='fas fa-calendar-alt'
                         text={['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 18:00', 'Duminica: 9:00 - 14:00']}/>
            <ContactInfo icon='fas fa-map-marked-alt'
                         text={['Str. Lorem, nr. 10, Ipsum']}/>
            <ContactInfo icon='fas fa-phone-alt'
                         text={['Telefon: 07********/ 031*******', 'contact@salon.com']}/>
        </div>
    )
}

export default Footer;
