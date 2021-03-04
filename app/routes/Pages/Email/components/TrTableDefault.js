import React from 'react';
import faker from 'faker/locale/en_US';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

import { 
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from './../../../../components';
import DateFormat from '../../../../utilities/dateformat';

/*eslint-enable */

const TrTableDefault = (props) => (
    <React.Fragment>
        {
            props.templates.map(template => (
                <tr key={template.id}>
                    <td className="align-middle">
                        <div className={props.projectColor}>
                            {template.name}
                        </div>
                    </td>
                    <td className="align-middle">
                        <span className="text-inverse">
                            {template.subject}
                        </span>
                    </td>
                    <td className="align-middle">
                        <div>
                            {template.send_email.toString()}
                        </div>
                    </td>
                    <td className="align-middle">
                        <div>
                            {DateFormat(template.created_at)}
                        </div>
                    </td>
                    <td className="align-middle text-right">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" className={` text-decoration-none ${props.dropdownColor} `}>
                                <i className="fa fa-gear"></i><i className="fa fa-angle-down ml-2"></i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ Link } to={`/edit-template/${template.id}`}>
                                    <i className="fa fa-fw fa-pencil mr-2"></i>
                                    Edit
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </td>

                </tr>
            ))}
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
