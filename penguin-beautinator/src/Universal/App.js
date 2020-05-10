import React from 'react';
import NavBar from './NavBar';
import SalonPicker from '../SalonPicker/SalonPicker';
import SalonPage from '../SalonPage/SalonPage';
import './Universal.css';

const MainApp = (props) => {
    return (
        <div className={'MainApp'}>
            <NavBar/>
            <SalonPicker salons={[props.salon]}/>
            <SalonPage sections={props.sections}
                       salon={props.salon}
                       services={props.services}/>
        </div>
    )
}

MainApp.defaultProps = {
    sections: {
        about: 'Despre noi',
        services: 'Servicii',
        gallery: 'Galerie',
        contact: 'Contact'
    },
    salon: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
        name: 'Nume salon',
        noFullStars: 3,
        noReviews: 1,
        noDollars: 2,
        description: 'Lorem ipsum sit amet',
        address: 'Lorem Ipsum 10',
        images: [],
        program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
        phone: ['07********', '031*******'],
        email: ['contact@salon.com']
    },
    services: {
        coafor: [
            {title: 'Tuns - par scurt', price: 10, length: 20},
            {title: 'Tuns - par mediu', price: 15, length: 25},
            {title: 'Tuns - par lung', price: 20, length: 30}],
        manichiura: [
            {title: 'Clasic', price: '25', length: 15},
            {title: 'Semipermanenta', price: '50', length: 30}]
    }
}

export default MainApp;
