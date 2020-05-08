import React from 'react';
import Item from './Item';

const NavBar = () => {
    return (
        <div className={'NavBar'}>
            <Item section={'Penguin Beautinator'}
                  className={'Left'}
                  src={'https://discordemoji.com/assets/emoji/3946_Penguin_walk.gif'}
                  href={'index.html'}/>
            <Item section={'Saloane'}
                  className={'Left'}
                  src={'https://media.giphy.com/media/Ep8HfalJsuCcg/giphy.gif'}
                  href={'saloane.html'}/>
            <Item section={'Programarile mele'}
                  className={'Left'}
                  src={'https://thumbs.gfycat.com/BossyCarelessHake.webp'}
                  href={'programari.html'}/>
            <Item section={'Help'}
                  className={'Left'}
                  src={'https://cdn.lowgif.com/small/1dad674689d69594-list-of-emoticons-club-penguin-wiki-fandom-powered-by-wikia.gif'}
                  href={'help.html'}/>
            <Item section={'Login'}
                  className={'Right'}
                  src={'https://cdn.lowgif.com/full/a749cd2097670166-image-mediawiki-emoticons-cj-bow-gif-club-penguin.gif'}
                  href={'login.html'}/>
            <Item section={'Sign Up'}
                  className={'Right'}
                  src={'https://img.pngio.com/top-club-penguin-stickers-for-android-ios-find-the-best-gif-club-penguin-transparent-606_648.gif'}
                  href={'signup.html'}/>
        </div>
    )
}

export default NavBar;
