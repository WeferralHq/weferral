import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import DateFormat from '../../../utilities/dateformat';
import { 
    Badge,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    AvatarAddOn
} from '../../../components';
import WeferralTableBase from '../../components/Datatable';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

//const history = useHistory();

export class ManageParticipantList extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            publishingModal: false,
            deleteModal: false,
            rows: {},
            alerts: {},
            currentDataObject: {},
            lastFetch: Date.now(),
            loading: true,
            advancedFilter: null,
        };

        this.fetchData = this.fetchData.bind(this);
        this.rowActionsFormatter = this.rowActionsFormatter.bind(this);
        this.DeleteParticipant = this.DeleteParticipant.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    /**
     * Fetches Table Data
     * Sets the state with the fetched data for use in WeferralTableBase's props.row
     */
    fetchData() {
        let self = this;
        let url = `${port}/api/v1/participants`;
        Fetcher(url).then(function (response) {
            if (!response.error) {
                self.setState({rows: response});
            }
            self.setState({loading: false});
        });
    }

    DeleteParticipant(id){
        let self = this;
        Fetcher(`${port}/api/v1/participant/${id}`, 'DELETE').then(function (response) {
            if(!response.error){
                self.setState({success: true, response: response});
            }else{
                let msg = 'Cannot delete a participant that has records attached to it.'
                self.setState({
                    alerts: {
                        color: 'danger',
                        icon: 'times',
                        message: `${response.error} : ${msg}`
                    }
                });
            }
        })
    }

    /**
     * Cell formatters
     * Formats each cell data by passing the function as the dataFormat prop in TableHeaderColumn
     */
    nameFormatter(cell, row){
        return ( <Link to={`/manage-participant/${row.id}`}>{cell}</Link> );
    }
    emailFormatter(cell){
        return ( cell );
    }
    idFormatter(cell){
        return ( cell );
    }
    statusFormatter(cell){
        let pqProps;
        switch (cell) {
            case 'active':
                pqProps = {
                    color: 'success',
                    text: 'Active'
                }
                break;
            case 'suspended':
                pqProps = {
                    color: 'warning',
                    text: 'Suspended'
                }
                break;
            default:
                pqProps = {
                    color: 'secondary',
                    text: 'Invited'
                }
        }
        return (<Badge color={pqProps.color}>{ pqProps.text}</Badge> );
        // return ( cell ? 'Published' : 'Unpublished' );
    }
    createdFormatter(cell){
        return (DateFormat(cell, {time: true}));
    }
    rowActionsFormatter(cell, row){
        let self = this;
        return(
            <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className={` text-decoration-none `}>
                    <i className="fa fa-gear"></i><i className="fa fa-angle-down ml-2"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag={Link} to={`/edit-participant/${row.id}`}>
                        <i className="fa fa-fw fa-envelope mr-2"></i>
                            Edit
                    </DropdownItem>
                    <DropdownItem>
                        <i className="fa fa-fw fa-phone mr-2"></i>
                            Delete
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        )
    }

    render() {
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        }else {
            return(
                <Row>
                    <Col xl={ 12 }>
                        <WeferralTableBase
                            rows={this.state.rows}
                            createItemAction={() => { this.props.history.push('/participant/create') }}
                            createItemLabel={'Create a Participant'}
                            fetchRows={this.fetchData}
                            sortColumn="created_at"
                            sortOrder="desc"
                        >
                            <TableHeaderColumn isKey
                                            dataField='name'
                                               dataSort={ true }
                                               dataFormat={ this.nameFormatter }
                                               width={200}>
                                Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='email'
                                               dataSort={ true }
                                               dataFormat={ this.emailFormatter }
                                               searchable={true}
                                               width={150}>
                                Email
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='referral_code'
                                               dataSort={ true }
                                               dataFormat={ this.idFormatter }
                                               searchable={true}
                                               width={200}>
                                Referral Code
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='status'
                                               dataSort={ true }
                                               dataFormat={ this.statusFormatter }
                                               searchable={false}
                                               filterFormatted
                                               width={100}>
                                Status
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='created_at'
                                               dataSort={ true }
                                               dataFormat={ this.createdFormatter }
                                               searchable={true}
                                               filterFormatted
                                               width={150}>
                                Created At
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='Actions'
                                               className={'action-column-header'}
                                               columnClassName={'action-column'}
                                               dataFormat={ this.rowActionsFormatter }
                                               searchable={false}
                                               width={100}>
                            </TableHeaderColumn>
                        </WeferralTableBase>
                    </Col>
                </Row>
            )
        }
    }
}