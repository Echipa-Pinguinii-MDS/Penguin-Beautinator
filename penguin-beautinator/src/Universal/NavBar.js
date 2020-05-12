import React from 'react';
import {Link} from 'react-router-dom';
import Login from '../Login/Login';
import './Universal.css';

const Item = (props) => {
    return (
        <div className={'Item'}>
            <img className={props.className} src={props.src} alt={''}/>
            <h2>{props.section}</h2>
        </div>
    )
}

const NavBar = () => {
    return (
        <div className={'NavBar'}>
            <Link to={'/desprenoi'}>
                <Item section={'Penguin Beautinator'}
                      className={'Left'}
                      src={'https://discordemoji.com/assets/emoji/3946_Penguin_walk.gif'}/>
            </Link>

            <Link to={'/saloane'}>
                <Item section={'Saloane'}
                      className={'Left'}
                      src={'https://media.giphy.com/media/Ep8HfalJsuCcg/giphy.gif'}/>
            </Link>

            <Link to={'/programari'}>
                <Item section={'Programarile mele'}
                      className={'Left'}
                      src={'https://thumbs.gfycat.com/BossyCarelessHake.webp'}/>
            </Link>

            <Link to={'/login'}>
                <Item section={'Login'}
                      className={'Right'}
                      src={'https://cdn.lowgif.com/full/a749cd2097670166-image-mediawiki-emoticons-cj-bow-gif-club-penguin.gif'}/>
            </Link>

            <Link to={'/signup'}>
                <Item section={'Sign Up'}
                      className={'Right'}
                      src={'https://img.pngio.com/top-club-penguin-stickers-for-android-ios-find-the-best-gif-club-penguin-transparent-606_648.gif'}/>
            </Link>
        </div>
    )
}

export default NavBar;
