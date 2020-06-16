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
        <Button className='ScheduleButton' disabled={props.disabled} onClick={props.handleSubmit}>
            <TiShoppingCart/>
            Rezerva
        </Button>
    )
}

PopUpLoggedIn.propTypes = {
    disabled: PropTypes.bool.isRequired,
    data: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

const ScheduleButton = (props) => {
    return (
        <div>
        {(Cookies.get('user_id') === undefined) &&
            <PopUpNotLoggedIn disabled={props.disabled}/>}

        {(Cookies.get('user_id') !== undefined) &&
            <PopUpLoggedIn disabled={props.disabled} data={props.data} handleSubmit={props.handleSubmit}/>}
        </div>
    )
}

ScheduleButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    data: PropTypes.string,
    handleSubmit: PropTypes.func
}

export default ScheduleButton;
