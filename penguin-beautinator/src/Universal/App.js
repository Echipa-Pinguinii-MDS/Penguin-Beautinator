import React from 'react';
import NavBar from './NavBar';
import SalonPicker from '../SalonPicker/SalonPicker';

const MainApp = () => {
    return (
        <div className={'MainApp'}>
            <NavBar/>
            <SalonPicker/>
        </div>
    )
}

export default MainApp;
