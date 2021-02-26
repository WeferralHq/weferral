import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    NavItem,
    NavLink
} from '../../components';

const NavbarLogout = (props) => (
    <NavItem { ...props }>
        <NavLink 
            tag={ Link } 
            to="/logout"
            >
            <i className="fa fa-power-off"></i>
        </NavLink>
    </NavItem>
);
NavbarLogout.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarLogout };
