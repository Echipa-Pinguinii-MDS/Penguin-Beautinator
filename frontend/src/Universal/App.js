import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './NavBar';
import PenguinBeautinator from '../PenguinBeautinator/PenguinBeautinator';
import SalonPicker from '../SalonPicker/SalonPicker';
import SalonPage from '../SalonPage/SalonPage';
import Login from '../Login/Login';
import './Universal.css';

const MainApp = (props) => {
    return (
        <Router className={'MainApp'}>
            <NavBar/>
            <div className={'AppPage'}>
                <Route path={'/desprenoi'}> <PenguinBeautinator/> </Route>
                <Route exact path={'/saloane'}> <SalonPicker salons={props.salons}/> </Route>
                <Route path={'/programari'}/>
                <Route path={'/login'}> <Login/> </Route>
                <Route path={'/signup'}/>
                {props.salons.map(salon =>
                    <Route key={salon.name} path={'/' + salon.name}>
                        <SalonPage sections={props.sections}
                                   salon={salon}
                                   services={props.services}/>
                    </Route>
                )}
            </div>
        </Router>
    )
}

MainApp.defaultProps = {
    sections: {
        about: 'Despre noi',
        services: 'Servicii',
        gallery: 'Galerie',
        contact: 'Contact'
    },
    salons: [{
        id: 's5',
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
    }],
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

export default MainApp;
