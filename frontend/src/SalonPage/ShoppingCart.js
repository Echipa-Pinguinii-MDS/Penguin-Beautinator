import React from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';

const Info = (props) => {
    return (
        <div className={'CartInfo'}>
            <p>{props.title}</p>
            <p>{props.price} lei</p>
        </div>
    )
}

Info.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

const Section = (props) => {
    return (
        <div className={'CartSection'}>
            <h5>{props.category}</h5>
            {props.service.map(service =>
                <Info key={service.id}
                      title={service.title}
                      price={service.price}/>
            )}
        </div>
    )
}

Section.propTypes = {
    category: PropTypes.string.isRequired,
    service: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired).isRequired
}

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
        <div className={'CartInfo'}>
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
    }).isRequired).isRequired)
}

const AppButton = () => {
    return (
        <Popup trigger={<button>Rezerva</button>} modal>
            {close => (
                <div>
                    <a className={'close'} onClick={close}>
                        &times;
                    </a>
                    Conecteaza-te pentru a putea face o programare!
                    <br/>
                    <Link to={'/login'}>
                        Intra in cont
                    </Link>
                    <br/>
                    Nu ai cont?
                    <br/>
                    <Link to={'/signup'}>
                        Inregistreaza-te
                    </Link>
                </div>
            )}
        </Popup>
    )
}

const ShoppingCart = (props) => {
    return (
        <div className={'ShoppingCart'}>
            <h4>Servicii selectate</h4>
            {Object.keys(props.services).map(category =>
                <Section key={category} service={props.services[category]} category={category}/>
            )}
            <Total services={props.services}/>
            <AppButton/>
        </div>
    )
}

ShoppingCart.propTypes = {
    services: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired).isRequired)
}

ShoppingCart.defaultProps = {
    services: {
        coafor: [
            {id: 1, title: 'Tuns - par scurt', price: 10, length: 20},
            {id: 2, title: 'Tuns - par mediu', price: 15, length: 25},
            {id: 3, title: 'Tuns - par lung', price: 20, length: 30}],
        manichiura: [
            {id: 4, title: 'Clasic', price: 25, length: 15},
            {id: 5, title: 'Semipermanenta', price: 50, length: 30}]
    }
}

export default ShoppingCart;
