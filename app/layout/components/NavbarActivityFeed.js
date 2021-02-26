import React from 'react';
import { Link } from 'react-router-dom';
import faker from 'faker/locale/en_US';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
    UncontrolledDropdown,
    DropdownToggle,
    IconWithBadge,
    Badge,
    ExtendedDropdown,
    ListGroup,
    ListGroupItem,
    Media
} from './../../components';
import Fetcher from '../../utilities/fetcher';
import port from '../../port';
import DateFormat from '../../utilities/dateformat';

export class NavbarActivityFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            notifications : []
        };
        this.fetchNotifications = this.fetchNotifications.bind(this);
    }

    componentDidMount() {
        this.fetchNotifications();
    };

    fetchNotifications(){
        let self = this;
        Fetcher(`${port}/api/v1/notifications/unread`).then(function(response){
            if(!response.error){
                self.setState({notifications: response, loading: false});
                console.log(self.state.notifications);
            }
        });
    }

    render(){
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        }else{
            let notifys = this.state.notifications;
            return(
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                        <IconWithBadge
                            badge={<Badge pill color="primary">{notifys.length}</Badge>}
                        >
                            <i className="fa fa-bell-o fa-fw" />
                        </IconWithBadge>
                    </DropdownToggle>
                    <ExtendedDropdown right>
                        <ExtendedDropdown.Section className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Activity Feed</h6>
                            <Badge pill>{notifys.length}</Badge>
                        </ExtendedDropdown.Section>
    
                        <ExtendedDropdown.Section list>
                            <ListGroup>
                                {
                                    _.map(notifys, (notify) => (
                                        <ListGroupItem key={notify.id} action>
                                            <Media>
                                                <Media body>
                                                   <p className="mt-2 mb-1">
                                                        {notify.message}
                                                    </p>
                                                    <div className="small mt-2">
                                                        {DateFormat(notify.created_at)}
                                                    </div>
                                                </Media>
                                            </Media>
                                        </ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                        </ExtendedDropdown.Section>
    
                        <ExtendedDropdown.Section className="text-center" tag={Link} to="/apps/widgets">
                            See All Notifications
                    <i className="fa fa-angle-right fa-fw ml-2" />
                        </ExtendedDropdown.Section>
                    </ExtendedDropdown>
                </UncontrolledDropdown>
            )
        }
        
    }
    
};

export default NavbarActivityFeed;
