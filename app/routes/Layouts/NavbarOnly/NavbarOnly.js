import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withPageConfig } from
    './../../../components/Layout/withPageConfig';
import {
    Container,
} from './../../../components';

class NavbarOnly extends React.Component {
    static propTypes = {
        pageConfig: PropTypes.object
    };

    componentDidMount() {
        const { pageConfig } = this.props;
        
        pageConfig.setElementsVisibility({
            sidebarHidden: true
        });
    }

    componentWillUnmount() {
        const { pageConfig } = this.props;

        pageConfig.setElementsVisibility({
            sidebarHidden: false
        });
    }

    render() {
        return (
            <Container>
                <p className="mb-5 mt-3">
                    Welcome to the <b>&quot;Weferral&quot;</b> A referral and affiliate management and tracking software&nbsp;
                </p>

                <section className="mb-5">
                    <h6>
                        Layouts for this framework:
                    </h6>
                    <ul className="pl-3">
                        <li>
                            <Link to="/layouts/navbar" className="text-primary">Navbar</Link>
                        </li>
                        <li>
                            <Link to="/layouts/sidebar" className="text-primary">Sidebar</Link>
                        </li>
                        <li>
                            <Link to="/layouts/sidebar-with-navbar" className="text-primary">Sidebar with Navbar</Link>
                        </li>
                    </ul>
                </section>

            </Container>
        );
    }
}

const ExtendedNavbarOnly = withPageConfig(NavbarOnly);

export {
    ExtendedNavbarOnly as NavbarOnly
};
