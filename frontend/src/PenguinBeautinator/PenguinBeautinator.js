import React from 'react';
import './PenguinBeautinator.css';
import Logo from "../Images/logo-transparent.png";
import Gif from "../Images/giphy_transparent.gif";

const PenguinBeautinator = () => {
    return (
        <div>
            <img src={Logo} className={'homepage_Logo'} alt = ":("/>
            <img src={Gif} className={'Homepage_Gif'} alt = ":("/>
            <p>Te-ai intrebat vreodata de ce pinguinii arata atat de bine si niciodata nu intarzie?<br/>
                Ei bine, acum ai raspunsul!<br/>
                Ei folosesc Penguin Beautinator ca sa fie mereu la timp si sa fie mereu imaculati</p>
        </div>
    )
}

export default PenguinBeautinator;