import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';

const PopUpNotLoggedIn = (props) => {
    return (
        <Popup trigger={<button disabled={props.disabled}>Rezerva</button>} modal>
            {close => (
                <div className={'PopupNotLoggedIn'}>
                    <a className={'Close'} onClick={close}>&times;</a>
                    Conecteaza-te pentru a putea face o programare!
                    <br/>
                    <Link to={'/login'}>Intra in cont</Link>
                    <br/>
                    Nu ai cont?
                    <br/>
                    <Link to={'/signup'}>Inregistreaza-te</Link>
                </div>
            )}
        </Popup>
    )
}

PopUpNotLoggedIn.propTypes = {
    disabled: PropTypes.bool.isRequired
}

const PopUpLoggedIn = (props) => {
    return (
        <Popup trigger={<button disabled={props.disabled}>Rezerva</button>} modal>
            {close => (
                <div className={'PopupLoggedIn'}>
                    <a className={'Close'} onClick={close}>&times;</a>
                    Programarea din data de {props.data} a fost facuta cu succes!
                    <br/>
                    O poti vizualiza in <Link to={'/programari'}>Programarile mele</Link>
                </div>
            )}
        </Popup>
    )
}

PopUpLoggedIn.propTypes = {
    disabled: PropTypes.bool.isRequired,
    data: PropTypes.string.isRequired
}

const ScheduleButton = (props) => {
    return (
        <div className={'ScheduleButton'}>
        {(Cookies.get('user_id') === undefined) &&
            <PopUpNotLoggedIn disabled={props.disabled}/>}
        {(Cookies.get('user_id') !== undefined) &&
            <PopUpLoggedIn disabled={props.disabled} data={props.data}/>}
        </div>
    )
}

ScheduleButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    data: PropTypes.string
}

export default ScheduleButton;
