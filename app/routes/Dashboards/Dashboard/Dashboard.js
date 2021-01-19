import React from 'react';
import {
    Container,
    Row,
    Card,
    CardBody,
    CustomInput,
    CardDeck,
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Button,
    Col
} from './../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            analytics: {},
        };

        this.fetchAnalytics = this.fetchAnalytics.bind(this);
    }

    componentDidMount() {
        this.fetchAnalytics();
        /*if (!isAuthorized({permissions: ["can_administrate", "can_manage"]})) {
            return browserHistory.push("/login");
        } else {
            this.fetchAnalytics();
        }*/
    }

    fetchAnalytics() {
        let self = this;
        Fetcher(`${port}/api/v1/analytics/data`).then(function (response) {
            self.setState({analytics: response});
        }).then(function () {
            self.setState({loading: false});
        });
    }

    render(){
        let stats = this.state.analytics;
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        } else{
            return(
                <Container>
                    <Row>
                        <Col lg={3}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h5" className="mb-4">
                                        Total Revenue
                                    </CardTitle>
                                    <div>
                                        <div className="mb-3">
                                            <h2>{`$${stats.participantStats.total_conversions}`}</h2>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={3}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h5" className="mb-4">
                                        Customers
                                    </CardTitle>
                                    <div>
                                        <div className="mb-3">
                                            <h2>{stats.customerStats.total_customers}</h2>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={3}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6" className="mb-4">
                                        Paying Customers
                                    </CardTitle>
                                    <div>
                                        <div className="mb-3">
                                            <h2>{stats.customerStats.paying_customers}</h2>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={3}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6" className="mb-4">
                                        Participants
                                    </CardTitle>
                                    <div>
                                        <div className="mb-3">
                                            <h2>{stats.participantStats.total_participants}</h2>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
        
    }
}