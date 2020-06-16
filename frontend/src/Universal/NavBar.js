import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import './App.css';
import Cookies from 'js-cookie';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.refreshLoggedIn = this.refreshLoggedIn.bind(this)
    }

    componentDidMount() {
        this.refreshLoggedIn()
    }

    refreshLoggedIn = () => {
        this.setState({loggedIn: Cookies.get('user_id') !== undefined})
    }

    Item = (props) => {
        return (
            <div className={'Item'}>
                <img className={props.className} src={props.src} alt={''}/>
                <h2>{props.section}</h2>
            </div>
        )
    }

    logout = () => {
        Cookies.remove('user_id')
        window.location.reload(false)
    }

    rightSide = () => {
        if (this.state.loggedIn) {
            return (
                <div className={'Right'} onClick={this.logout}>
                    <this.Item section={'Logout'}
                          className={'SmallGif'}
                          src={'https://cdn.lowgif.com/full/a749cd2097670166-image-mediawiki-emoticons-cj-bow-gif-club-penguin.gif'}/>
                </div>
            )
        }
    }

    render() {
        return (
            <div className={'NavBarHelp'}>
                <Navbar className={'NavBar'}>
                    <Link to={'/desprenoi'} className={'Left'}>
                        <this.Item section={'Penguin Beautinator'}
                              className={'SmallGif'}
                              src={'https://discordemoji.com/assets/emoji/3946_Penguin_walk.gif'}/>
                    </Link>

                    <Link to={'/saloane'} className={'Left'}>
                        <this.Item section={'Saloane'}
                              className={'SmallGif'}
                              src={'https://media.giphy.com/media/Ep8HfalJsuCcg/giphy.gif'}/>
                    </Link>

                    <Link to={'/programari'} className={'Left'}>
                        <this.Item section={'Programarile mele'}
                              className={'SmallGif'}
                              src={'https://thumbs.gfycat.com/BossyCarelessHake.webp'}/>
                    </Link>

                    {this.rightSide()}

                    <Link to={'/account'} className={'Right'}>
                        <this.Item section={'Cont'}
                              className={'SmallGif'}
                              src={'https://img.pngio.com/top-club-penguin-stickers-for-android-ios-find-the-best-gif-club-penguin-transparent-606_648.gif'}/>
                    </Link>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;
