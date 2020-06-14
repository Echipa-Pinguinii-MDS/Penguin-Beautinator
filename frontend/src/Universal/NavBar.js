import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import './App.css';

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
        <Navbar className={'NavBar'}>
            <Link to={'/desprenoi'} className = {'Left'}>
                <Item section={'Penguin Beautinator'}
                      className={'SmallGif'}
                      src={'https://discordemoji.com/assets/emoji/3946_Penguin_walk.gif'}/>
            </Link>

            <Link to={'/saloane'} className = {'Left'}>
                <Item section={'Saloane'}
                      className={'SmallGif'}
                      src={'https://media.giphy.com/media/Ep8HfalJsuCcg/giphy.gif'}/>
            </Link>

            <Link to={'/programari'} className = {'Left'}>
                <Item section={'Programarile mele'}
                      className={'SmallGif'}
                      src={'https://thumbs.gfycat.com/BossyCarelessHake.webp'}/>
            </Link>

            <Link to={'/signup'} className = {'Right'}>
                <Item section={'Sign Up'}
                      className={'SmallGif'}
                      src={'https://img.pngio.com/top-club-penguin-stickers-for-android-ios-find-the-best-gif-club-penguin-transparent-606_648.gif'}/>
            </Link>

            <Link to={'/login'} className = {'Right'}>
                <Item section={'Login'}
                      className={'SmallGif'}
                      src={'https://cdn.lowgif.com/full/a749cd2097670166-image-mediawiki-emoticons-cj-bow-gif-club-penguin.gif'}/>
            </Link>
        </Navbar>
    )
}

export default NavBar;
