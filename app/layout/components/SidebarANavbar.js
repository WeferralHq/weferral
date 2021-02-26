import React from 'react';
import { Link } from 'react-router-dom';

import {
    Navbar,
    Nav,
    NavItem,
    SidebarTrigger
} from './../../components';

import { NavbarActivityFeed } from './NavbarActivityFeed';
import { NavbarMessages } from './NavbarMessages';
import { NavbarLogout } from './NavbarLogout';

export const SidebarANavbar = () => (
    <Navbar light expand="xs" fluid>
        <Nav navbar>
            <NavItem className="mr-3">
                <SidebarTrigger/>
            </NavItem>
            <NavItem className="navbar-brand h5 mb-0 d-lg-none">
                <Link to="/">
                    react.bs4
                </Link>
            </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
            <NavbarActivityFeed />
            <NavbarLogout className="ml-2" />
        </Nav>
    </Navbar>
);
