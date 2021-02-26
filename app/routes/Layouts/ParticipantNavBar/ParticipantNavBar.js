import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    Avatar,
    AvatarAddOn,
    Button,
    DropdownToggle,
    NavbarThemeProvider,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    UncontrolledCollapse,
    UncontrolledDropdown,
} from './../../../components';
import { NavbarLogout } from './../../../layout/components/NavbarLogout';
import { DropdownProfile } from '../../components/Dropdowns/DropdownProfile';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import Cookies from 'js-cookie';

export class ParticipantNavBar extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            rows: {},
            currentDataObject: {},
            lastFetch: Date.now(),
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let self = this;
        let pid = Cookies.get("pid");
        let url = `${port}/api/v1/participant/profile/${pid}`;
        Fetcher(url).then(function (response) {
            if (!response.error) {
                self.setState({rows: response});
            }
            self.setState({loading: false});
        });
    }

    render(){
        return(
            <NavbarThemeProvider style="light" color="primary" className="shadow-sm">
                <Navbar expand="lg" themed>
                    <Link to="/">
                        <NavbarBrand className="mb-0" tag="div">
                            Weferral
                    </NavbarBrand>
                    </Link>

                    <Nav pills>
                        <NavItem>
                            <NavLink tag={NavbarToggler} id="navbar-navigation-toggler" className="b-0">
                                <i className="fa fa-fw fa-bars"></i>
                            </NavLink>
                        </NavItem>
                    </Nav>

                    { /* Navigation with Collapse */}
                    <UncontrolledCollapse navbar toggler="#navbar-navigation-toggler">
                        <Nav navbar accent={ 'accent' } pills={ 'pills' }>
                            <NavItem>
                                <NavLink tag={Link} to="/interface/navbars">
                                    Dashboard
                                    {/*<span className={classNames({ 'mr-3': !(pills || accent) })}>
                                        <i className="fa fa-fw fa-home d-none d-md-inline"></i>
                                        <span className="d-md-none">
                                            Dashboard
                                        </span>
        </span>*/}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>

                    { /* END Navbar: Left Side */}
                    { /* START Navbar: Right Side */}
                    <Nav className="ml-auto" pills>
                        { /* START Navbar: Dropdown */}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav>
                                <Avatar.Image
                                    size="sm"
                                    src="http://bs4.webkom.co/img/avatars/2.jpg"
                                    addOns={[
                                        <AvatarAddOn.Icon
                                            className="fa fa-circle"
                                            color="white"
                                            key="avatar-icon-bg"
                                        />,
                                        <AvatarAddOn.Icon
                                            className="fa fa-circle"
                                            color="danger"
                                            key="avatar-icon-fg"
                                        />
                                    ]}
                                />
                            </DropdownToggle>
                            <DropdownProfile
                                right
                                name={this.state.rows.name}
                                id={this.state.rows.id}
                            />
                        </UncontrolledDropdown>
                        { /* END Navbar: Dropdown */}
                        <NavbarLogout className="d-none d-lg-block" />
                    </Nav>
                    { /* END Navbar: Right Side */}
                </Navbar>
            </NavbarThemeProvider>
        )
    }
}