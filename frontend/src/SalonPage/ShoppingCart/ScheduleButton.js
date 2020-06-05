import React from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';

const ScheduleButton = () => {
    return (
        <Popup trigger={<button>Rezerva</button>} modal>
            {close => (
                <div className={'Popup'}>
                    <a className={'Close'} onClick={close}>
                        &times;
                    </a>
                    Conecteaza-te pentru a putea face o programare!
                    <br/>
                    <Link to={'/login'}>
                        Intra in cont
                    </Link>
                    <br/>
                    Nu ai cont?
                    <br/>
                    <Link to={'/signup'}>
                        Inregistreaza-te
                    </Link>
                </div>
            )}
        </Popup>
    )
}

export default ScheduleButton;
