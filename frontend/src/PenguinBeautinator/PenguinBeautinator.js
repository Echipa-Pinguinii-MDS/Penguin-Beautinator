import React from 'react';
import './PenguinBeautinator.css';
import Logo from '../Images/logo.png';
import Gif from '../Images/giphy_transparent.gif';

const PenguinBeautinator = () => {
    return (
        <div>
            <img src={Logo} className={'homepage_Logo'} alt = ':('/>
            <img src={Gif} className={'Homepage_Gif'} alt = ':('/>
            <p className={'Description'}>Te-ai intrebat vreodata de ce pinguinii arata atat de bine si niciodata nu intarzie?</p>
            <p className={'Description'}>Ei bine, acum ai raspunsul!<br/></p>
            <p className={'Description'}>Ei folosesc Penguin Beautinator ca sa fie mereu la timp si sa fie mereu imaculati</p>
        </div>
    )
}

export default PenguinBeautinator;
