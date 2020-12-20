import React from 'react';
import faker from 'faker/locale/en_US';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { 
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Media,
    Avatar,
    AvatarAddOn
} from './../../../../components';
import { randomAvatar } from './../../../../utilities';

/*eslint-disable */
const colorStatus = [
    "danger",
    "success",
    "warning",
    "secondary"
];
/*eslint-enable */

const TrTableDefault = (props) => (
    <React.Fragment>
        {
            _.times(4, (index) => (
                <tr key={ index }>
                    <td className="align-middle">
                        <div className={ props.projectColor }>
                            { props.templates.name } 
                        </div>
                    </td>
                    <td className="align-middle">
                        <div>
                            { props.templates.subject } 
                        </div>
                    </td>
                    <td className="align-middle">
                        <div>
                            { props.templates.send_email}
                        </div>
                    </td>
                    <td className="align-middle">
                        <div>
                            30th Dec 2020
                        </div>
                    </td>
                    <td className="align-middle text-right">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" className={` text-decoration-none ${ props.dropdownColor } `}>
                                <i className="fa fa-gear"></i><i className="fa fa-angle-down ml-2"></i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-envelope mr-2"></i>
                                    Edit
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-phone mr-2"></i>
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </td>
                </tr>
            ))
        }
    </React.Fragment>
)

TrTableDefault.propTypes = {
    projectColor: PropTypes.node,
    leaderStatus: PropTypes.node,
    dropdownColor: PropTypes.node
};
TrTableDefault.defaultProps = {
    projectColor: "text-inverse",
    leaderStatus: "white",
    dropdownColor: ""
};

export { TrTableDefault };
