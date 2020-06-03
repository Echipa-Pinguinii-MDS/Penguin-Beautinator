import React from 'react';
import PropTypes from 'prop-types';
import Services from './Services';
import Total from './Total';
import ScheduleButton from './ScheduleButton';
import './ShoppingCart.css';

function ShoppingCart (props) {
    return (
        <div className={'ShoppingCart'}>
            <h4>Servicii selectate</h4>
            <Services services={props.services} handleClick={props.handleClick}/>
            <Total services={props.services}/>
            <ScheduleButton/>
        </div>
    )
}

ShoppingCart.propTypes = {
    handleClick: PropTypes.func.isRequired,
    services: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired).isRequired).isRequired
}

ShoppingCart.defaultProps = {
    services: {
        coafor: [
            {id: 3, title: 'Tuns - par lung', price: 20, length: 30}],
        manichiura: [
            {id: 4, title: 'Clasic', price: 25, length: 15},
            {id: 5, title: 'Semipermanenta', price: 50, length: 30}]
    }
}

export default ShoppingCart;
