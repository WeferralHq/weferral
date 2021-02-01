import React from 'react';
import { Link } from 'react-router-dom';

import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    UncontrolledCollapse,
    SidebarTrigger,
    ThemeConsumer
} from '../../../components';

export class SettingNavBar extends React.Component {

    render(){
        return(
            <React.Fragment>
                <Navbar
                    shadow
                    expand="lg"
                    light
                    color={ color }
                    fluid
                    className="pt-0 pt-lg-2"
                >
                    <h1 className="h5 mb-0 py-2 mr-auto d-lg-none">
                        Settings
                    </h1>

                    <UncontrolledCollapse navbar toggler="#navbar-navigation-toggler">
                        <Nav accent navbar>
                            <NavItem>
                                <NavLink
                                    active
                                    tag={ Link }
                                    to="/files"
                                >
                                    File
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ Link }
                                    to="/secret-key">
                                    Api Secret Key
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>

                    <Nav navbar pills className="ml-auto">
                        <NavItem>
                            <NavLink tag={ NavbarToggler } id="navbar-navigation-toggler" className="b-0">
                                <i className="fa fa-ellipsis-h fa-fw"></i>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </React.Fragment>
        )
    }
}