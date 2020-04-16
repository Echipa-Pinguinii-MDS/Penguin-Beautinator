import React from "react";
import PropTypes from 'prop-types';

const NavInfo = (props) => {
    return (
            <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href='#' className={props.class}>{props.text}</a>
            </div>
    );
};

NavInfo.propTypes = {
    text: PropTypes.string.isRequired,
    class: PropTypes.string
};

function NavBar() {
    return (
        <div>
            <NavInfo text='Despre noi'/>
            <NavInfo text='Preturi'/>
            <NavInfo text='Fa-ti o programare'/>
            <NavInfo text='Programarile mele'/>
        </div>
    )
}

export default NavBar;
