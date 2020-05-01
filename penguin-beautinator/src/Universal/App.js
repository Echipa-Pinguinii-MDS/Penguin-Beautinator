import React from 'react';
import NavBar from './NavBar';
import SalonPicker from '../SalonPicker/SalonPicker';
import SalonApp from "../SalonPage/SalonApp";

const MainApp = () => {
    return (
        <div className={'MainApp'}>
            <NavBar/>
            <SalonPicker/>
            <SalonApp/>
        </div>
    )
}

export default MainApp;
