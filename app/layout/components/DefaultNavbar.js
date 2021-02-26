import React from 'react';
import { Link } from 'react-router-dom';

import {
    Navbar,
    Nav,
    NavItem,
    SidebarTrigger
} from './../../components';

import NavbarActivityFeed from './NavbarActivityFeed';
import { NavbarUser } from './NavbarUser';
import { NavbarMessages } from './NavbarMessages';
import { NavbarLogout } from './NavbarLogout';
import {isAdmin, isParticipant} from '../../utilities/admin';
import { LogoThemed } from './../../routes/components/LogoThemed/LogoThemed';

const isadmin = async function() {
    let result = await isAdmin();
    return result;
}

export const DefaultNavbar = () => (
    <Navbar light expand="xs" fluid>
        <Nav navbar>
            <NavItem className="mr-3">
                <SidebarTrigger/>
            </NavItem>
            <NavItem className="navbar-brand d-lg-none">
                <Link to="/">
                    <LogoThemed />
                </Link>
            </NavItem>
            <NavItem className="d-none d-md-block">
                <span className="navbar-text">
                    <Link to="/">
                        <i className="fa fa-home"></i>
                    </Link>
                </span>
                <span className="navbar-text px-2">
                    <i className="fa fa-angle-right"></i>
                </span>
                <span className="navbar-text">
                    <Link to="/">Start</Link>
                </span>
                <span className="navbar-text px-2">
                    <i className="fa fa-angle-right"></i>
                </span>
                <span className="navbar-text">
                    Page Link
                </span>
            </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
            {isadmin === true && <NavbarActivityFeed />}
            <NavbarUser />
            <NavbarLogout className="ml-2" />
        </Nav>
    </Navbar>
);
