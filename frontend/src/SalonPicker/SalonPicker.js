import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SalonCard from './SalonCard';
import './SalonPicker.css';

const SalonPicker = (props) => {
    return (
        < div;
    className = {'SalonPicker'} >
        {
            props.salons.map(salon =>
                < Link to = {salon.name} key = {salon.name} >
            < SalonCard src = {salon.src}
            name = {salon.name}
            address = {salon.address}
            description = {salon.description}
            noFullStars = {salon.noFullStars}
            noReviews = {salon.noReviews}
            noDollars = {salon.noDollars};
    />
    < /Link>;
)
}
<
    /div>;
)
};

SalonPicker.defaultProps = {
    sections: {
        about: 'Despre noi',
        services: 'Servicii',
        gallery: 'Galerie',
        contact: 'Contact'
    },
    services: {
        coafor: [
            {title: 'Tuns - par scurt', price: 10, length: 20},
            {title: 'Tuns - par mediu', price: 15, length: 25},
            {title: 'Tuns - par lung', price: 20, length: 30}],
        manichiura: [
            {title: 'Clasic', price: 25, length: 15},
            {title: 'Semipermanenta', price: 50, length: 30}]
    }
};

SalonPicker.propTypes = {
    salons: PropTypes.array.isRequired
};

export default SalonPicker;
