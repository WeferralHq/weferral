import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import _ from 'lodash';
import moment from 'moment';

import {
    EmptyLayout,
    Badge,
    Button,
    CustomInput,
    ButtonGroup,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from '../../../../app/components';
import { CustomExportCSV } from '../../Tables/components/CustomExportButton';
import { CustomSearch } from '../../Tables/components/CustomSearch';
import { CustomPaginationPanel } from '../../Tables/components/CustomPaginationPanel';
import { CustomSizePerPageButton } from '../../Tables/components/CustomSizePerPageButton';
import { CustomPaginationTotal } from '../../Tables/components/CustomPaginationTotal';
import { Link } from 'react-router-dom';
import DateFormat from '../../../utilities/dateformat';
import Price from '../../../utilities/price';
import Fetcher from '../../../utilities/fetcher';
import Load from '../../../utilities/load';
import port from '../../../port';
import Cookie from 'js-cookie';
import {isParticipant} from '../../../utilities/admin';

const sortCaret = (order) => {
    if (!order)
        return <i className="fa fa-fw fa-sort text-muted"></i>;
    if (order)
        return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>
}


export class ParticipantCommission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //products: _.times(INITIAL_PRODUCTS_COUNT, generateRow),
            selected: [],
            loading : true,
            rows : [],
            generatedrows : [],
        };

        this.headerCheckboxRef = React.createRef();
        this.fetchData = this.fetchData.bind(this);
        this.generateRow = this.generateRow.bind(this);
    }

    async componentDidMount() {
        if (await isParticipant() === false) {
            return this.props.history.push("/login");
        }
        this.fetchData();
    };

    fetchData() {
        let self = this;
        let id = Cookie.get('pid');
        Fetcher(`${port}/api/v1/participant/commissions/${id}`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({rows: response, loading: false});
                console.log(self.state.rows);
                self.generateRow();
                //console.log(self.state.campaigns);
            }
        });
    }

    generateRow(){
        let self = this;

        const commissions = self.state.rows.map(function (row){
            //alert(DateFormat(camps.created_at));
            return {
                id: row.id,
                commission: row.amount,
                cost: row.conversion_amount,
                status: row.status,
                amount_paid: row.redeemedCredit,
                campaign_name: row.references.campaigns[0].name,
                created_at: DateFormat(row.created_at)
            }
        });
        //alert(JSON.stringify(campaigns));
        self.setState({generatedrows: commissions});
    }

    handleSelect(row, isSelected) {
        if (isSelected) {
            this.setState({ selected: [...this.state.selected, row.id] })
        } else {
            this.setState({
                selected: this.state.selected.filter(itemId => itemId !== row.id)
            })
        }
    }

    handleSelectAll(isSelected, rows) {
        if (isSelected) {
            this.setState({ selected: _.map(rows, 'id') })
        } else {
            this.setState({ selected: [] });
        }
    }

    createColumnDefinitions() {
        return [{
            dataField: 'id',
            text: 'ID',
            headerFormatter: column => (
                <React.Fragment>
                    <span className="text-nowrap">{ column.text }</span>
                    
                </React.Fragment>
            )
        }, {
            dataField: 'campaign_name',
            text: 'Campaign Name',
            sort: true,
            sortCaret,
            formatter: (cell) => (
                <span className="text-inverse">
                    { cell }
                </span>
            )
        },{
            dataField: 'status',
            text: 'Status',
            formatter: (cell) => {
                let pqProps;
                switch (cell) {
                    case 'approved':
                        pqProps = {
                            color: 'success',
                            text: 'Approved'
                        }
                        break;
                    case 'pending':
                        pqProps = {
                            color: 'warning',
                            text: 'Pending'
                        }
                        break;
                    default:
                        pqProps = {
                            color: 'danger',
                            text: 'Rejected'
                        }
                }
                return (<Badge color={pqProps.color}>{pqProps.text}</Badge>);
            },
            sort: true,
            sortCaret
        },{
            dataField: 'commission',
            text: 'Commission',
            sort: true,
            sortCaret,
            formatter: (cell) => (
                Price(cell)
            )
        }, {
            dataField: 'cost',
            text: 'Total Cost',
            sort: true,
            sortCaret,
            formatter: (cell) => (
                Price(cell)
            )
        }, {
            dataField: 'created_at',
            text: 'Date Created',
            formatter: (cell) =>
                moment(cell).format('DD/MM/YYYY'),
            sort: true,
            sortCaret
        }]; 
    }

    render() {
        if(!this.state.loading){
            const columnDefs = this.createColumnDefinitions();
            const paginationDef = paginationFactory({
                paginationSize: 5,
                showTotal: true,
                pageListRenderer: (props) => (
                    <CustomPaginationPanel {...props} size="sm" className="ml-md-auto mt-2 mt-md-0" />
                ),
                sizePerPageRenderer: (props) => (
                    <CustomSizePerPageButton {...props} />
                ),
                paginationTotalRenderer: (from, to, size) => (
                    <CustomPaginationTotal {...{ from, to, size }} />
                )
            });
            const selectRowConfig = {
                mode: 'checkbox',
                selected: this.state.selected,
                onSelect: this.handleSelect.bind(this),
                onSelectAll: this.handleSelectAll.bind(this),
                selectionRenderer: ({ mode, checked, disabled }) => (
                    <CustomInput type={mode} checked={checked} disabled={disabled} />
                ),
                selectionHeaderRenderer: ({ mode, checked, indeterminate }) => (
                    <CustomInput type={mode} checked={checked} innerRef={el => el && (el.indeterminate = indeterminate)} />
                )
            };

            return (
                <ToolkitProvider
                    keyField="id"
                    data={this.state.generatedrows}
                    columns={columnDefs}
                    search
                    exportCSV
                >
                    {
                        props => (
                            <React.Fragment>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <h6 className="my-0">
                                        Commission
                            </h6>
                                    <div className="d-flex ml-auto">
                                        <CustomSearch
                                            className="mr-2"
                                            {...props.searchProps}
                                        />
                                        <ButtonGroup>
                                            <CustomExportCSV
                                                {...props.csvProps}
                                            >
                                                Export
                                           </CustomExportCSV>
                                            
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <BootstrapTable
                                    classes="table-responsive"
                                    pagination={paginationDef}
                                    //filter={filterFactory()}
                                    selectRow={ selectRowConfig }
                                    bordered={false}
                                    responsive
                                    {...props.baseProps}
                                />
                            </React.Fragment>
                        )
                    }
                </ToolkitProvider>
            );
        } else{
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }
        
    }
}