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
import { NavbarLogout, ParticipantLogout } from './NavbarLogout';
import {isAdmin, isParticipant} from '../../utilities/admin';
import { LogoThemed } from './../../routes/components/LogoThemed/LogoThemed';

export default class DefaultNavbar extends React.Component{
    constructor() {
        super();
        this.state = {
            admin: false
        }
    }

    async componentDidMount(){
        let self = this;
        if (await isAdmin()) {
            self.setState({admin: true});
        }
    }

    render(){
        return(
            <Navbar light expand="xs" fluid>
                <Nav navbar>
                    <NavItem className="mr-3">
                        <SidebarTrigger />
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
                    </NavItem>
                </Nav>
                {this.state.admin && <Nav navbar className="ml-auto">
                    <NavbarActivityFeed />
                    <NavbarUser />
                    <NavbarLogout className="ml-2" />
                </Nav>}
                {this.state.admin === false && <Nav navbar className="ml-auto">
                    <NavbarActivityFeed />
                    <NavbarUser />
                    <ParticipantLogout className="ml-2" />
                </Nav>}
            </Navbar>
        )
    }
}
/*export const DefaultNavbar = () => (
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
            </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
            <NavbarActivityFeed />
            <NavbarUser />
            <NavbarLogout className="ml-2" />
        </Nav>
    </Navbar>
);*/
