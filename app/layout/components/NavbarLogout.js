import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'; 

import {
    NavItem,
    NavLink
} from '../../components';

const campaignName = Cookies.get('cName');

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
const ParticipantLogout = (props) => (
    <NavItem { ...props }>
        <NavLink 
            tag={ Link } 
            to={`${props.campaignName}/logout`}
            >
            <i className="fa fa-power-off"></i>
        </NavLink>
    </NavItem>
);
NavbarLogout.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

ParticipantLogout.propTypes = {
    className: PropTypes.string,
    campaignName: PropTypes.string,
    style: PropTypes.object
};
ParticipantLogout.defaultProps = {
    campaignName: Cookies.get('cName')
};

export { NavbarLogout, ParticipantLogout };
