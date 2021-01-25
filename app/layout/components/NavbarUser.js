import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    NavItem,
    NavLink
} from './../../components';
import port from '../../port';
import Fetcher from '../../utilities/fetcher';

const logOut = function(){
    localStorage.removeItem("jwtToken");
    Fetcher(`${port}/api/v1/auth/session/clear`).then(function (response) {
        return;
    });
}

const NavbarUser = (props) => (
    <NavItem { ...props }>
        <NavLink onClick={ () => { logOut() } }
            tag={ Link } to="/pages/login">
            <i className="fa fa-power-off"></i>
        </NavLink>
    </NavItem>
);
NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarUser };
