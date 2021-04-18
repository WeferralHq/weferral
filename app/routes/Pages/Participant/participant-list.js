import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import DateFormat from '../../../utilities/dateformat';
import { ToastContainer, toast } from 'react-toastify';
import { 
    EmptyLayout,
    UncontrolledAlert,
    Badge,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Media,
    Button,
    Container
} from '../../../components';
import WeferralTableBase from '../../components/Datatable';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { ImportButton } from './ImportButton';
import {isAdmin} from '../../../utilities/admin';
import Load from '../../../utilities/load';

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
            selectedId: 0,
            content: ''
        };

        this.fetchData = this.fetchData.bind(this);
        this.rowActionsFormatter = this.rowActionsFormatter.bind(this);
        this.DeleteParticipant = this.DeleteParticipant.bind(this);
        this.showHandler = this.showHandler.bind(this);
        this.contentInfo = this.contentInfo.bind(this);
        this.approve = this.approve.bind(this);
        this.disapprove = this.disapprove.bind(this);
    }

    async componentDidMount() {
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
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

    DeleteParticipant(id, value){
        let self = this;
        if(value === 'suspend'){
            Fetcher(`${port}/api/v1/participant/suspend/${id}`).then(function (response) {
                if(!response.error){
                    self.setState({success: true, response: response, alerts: {color:'info', message: 'Successfully suspended'}});
                }else{
                    let msg = 'Cannot suspend participant.'
                    self.setState({
                        alerts: {
                            color: 'danger',
                            message: `${response.error} : ${msg}`
                        }
                    });
                }
            })
        }else{
            Fetcher(`${port}/api/v1/participant/${id}`, 'DELETE').then(function (response) {
                if(!response.error){
                    self.setState({success: true, response: response, alerts: {color:'info', message: response.message}});
                }else{
                    let msg = 'Cannot delete a participant that has records attached to it.'
                    self.setState({
                        alerts: {
                            color: 'danger',
                            message: `${response.error} : ${response.message}`
                        }
                    });
                }
            })
        }
        
    }

    contentInfo(closeToast) {
        let self = this;
        let id = self.state.selectedId;
        let value = self.state.content;
        return(
            <Media>
                <Media middle left className="mr-3">
                    <i className="fa fa-fw fa-2x fa-info"></i>
                </Media>
                <Media body>
                    <Media heading tag="h6">
                        Alert!
                    </Media>
                    <p>
                        Are you sure you want to do this.
                    </p>
                    <div className="d-flex mt-2">
                        {value === 'suspend' &&
                        <Button color="primary" onClick={() => { self.DeleteParticipant(id, value) }} >
                        Suspend
                        </Button>}
                        {value === 'delete' &&
                        <Button color="danger" onClick={() => { self.DeleteParticipant(id, value) }} >
                        Delete
                        </Button>
                        }
                        <Button color="link" onClick={() => { closeToast }} className="ml-2 text-primary">
                            No
                        </Button>
                    </div>
                </Media>
            </Media>
        )
    }

    async showHandler(id, value){
        let self = this;
        await self.setState({selectedId: id, content: value});
        toast.error(self.contentInfo());
    }

    approve(id){
        let self = this;
        Fetcher(`${port}/api/v1/participant/approve/${id}`).then(function (response) {
            if(!response.error){
                self.setState({success: true, response: response, alerts: {color:'info', message: 'Successfully approved'}});
            }else{
                let msg = 'Cannot approve participant.'
                self.setState({
                    alerts: {
                        color: 'danger',
                        message: `${response.error} : ${msg}`
                    }
                });
            }
        })
    }

    disapprove(id){
        let self = this;
        Fetcher(`${port}/api/v1/participant/disapprove/${id}`).then(function (response) {
            if(!response.error){
                self.setState({success: true, response: response, alerts: {color:'info', message: 'Successfully disapproved'}});
            }else{
                let msg = 'Cannot disapprove participant.'
                self.setState({
                    alerts: {
                        color: 'danger',
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
                        <i className="fa fa-fw fa-edit mr-2"></i>
                            Edit
                    </DropdownItem>
                    <DropdownItem onClick={() => { this.showHandler(row.id, 'suspend') }}>
                        <i className="fa fa-fw fa-archive mr-2"></i>
                            Suspend
                    </DropdownItem>
                    {row.status === 'active' ? <DropdownItem onClick={() => { this.disapprove(row.id) }}>
                        <i className="fa fa-fw fa-minus-square mr-2"></i>
                        Disapprove
                    </DropdownItem>
                    : <DropdownItem onClick={() => { this.approve(row.id) }}>
                    <i className="fa fa-fw fa-check mr-2"></i>
                        Approve
                    </DropdownItem>}
                    <DropdownItem onClick={() => { this.showHandler(row.id, 'delete') }}>
                        <i className="fa fa-fw fa-trash mr-2"></i>
                            Delete
                    </DropdownItem>
                    
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        )
    }

    render() {
        if(this.state.loading){
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }else {
            let alert = this.state.alerts;
            return(
                <Container>
                    {alert.message && <UncontrolledAlert color={alert.color}>
                        {alert.message}
                    </UncontrolledAlert>}
                    <Row>
                    <Col xl={ 12 }>
                        <ImportButton />
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
                    <ToastContainer 
                    position="top-center"
                    autoClose={50000}
                    draggable={true}
                    hideProgressBar={true}
                   />
                </Container>
                
            )
        }
    }
}