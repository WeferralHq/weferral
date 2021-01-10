import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { 
    DropdownMenu,
    DropdownItem
} from './../../../components';

const DropdownProfile = (props) => (
    <React.Fragment>
        <DropdownMenu right={ props.right } >
            <DropdownItem header>
                { props.name }
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={ Link } to={`/apps/profile-details/${props.id}`}>
                My Profile
            </DropdownItem>
            <DropdownItem tag={ Link } to={`/apps/settings-edit/${props.id}`}>
                Settings
            </DropdownItem>
            {/*<DropdownItem tag={ Link } to="/apps/billing-edit">
                Billings
</DropdownItem>*/}
            <DropdownItem divider />
            <DropdownItem tag={ Link } to="/pages/login">
                <i className="fa fa-fw fa-sign-out mr-2"></i>
                Sign Out
            </DropdownItem>
        </DropdownMenu>
    </React.Fragment>
)
DropdownProfile.propTypes = {
    position: PropTypes.string,
    right: PropTypes.bool,
    name: PropTypes.string
};
DropdownProfile.defaultProps = {
    position: ""
};

export { DropdownProfile };
