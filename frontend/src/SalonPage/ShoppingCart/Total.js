import React from 'react';
import PropTypes from 'prop-types';

const Total = (props) => {
    function findTotal() {
        let price = 0;
        Object.keys(props.services).map(category =>
            props.services[category].map(service =>
                price += service.price
            )
        )
        return price + ' lei';
    }

    return (
        <div className={'Total'}>
            <h4>Total</h4>
            <h4>{findTotal()}</h4>
        </div>
    )
}

Total.propTypes = {
    services: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired).isRequired).isRequired
}

export default Total;
