import React from 'react';
import PropTypes from 'prop-types';
import {TiShoppingCart} from 'react-icons/ti';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';

const PopUpNotLoggedIn = (props) => {
    return (
        <Popup trigger={
            <Button className='ScheduleButton' disabled={props.disabled}>
                <TiShoppingCart/>
                Rezerva
            </Button>
        } modal>
            {close => (
                <div className={'PopupNotLoggedIn'}>
                    <p className={'Close'} onClick={close}>&times;</p>
                    <p>Conecteaza-te pentru a putea face o programare!<br/>
                        <Link to={'/account'}>Click aici</Link>
                    </p>
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
        <Popup trigger={
            <Button className='ScheduleButton' disabled={props.disabled}>
                <TiShoppingCart/>
                Rezerva
            </Button>
        } modal>
            {close => (
                <div className={'PopupLoggedIn'}>
                    <p className={'Close'} onClick={close}>&times;</p>
                    <p>Programarea din data de {props.data} a fost facuta cu succes!<br/>
                        O poti vizualiza in <Link to={'/programari'}>Programarile mele</Link>
                    </p>
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
        <div>
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
