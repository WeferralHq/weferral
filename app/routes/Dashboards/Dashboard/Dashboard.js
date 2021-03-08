import React from 'react';
import {
    Badge,
    Container,
    Row,
    Card,
    CardBody,
    EmptyLayout,
    Table,
    CardTitle,
    Button,
    Col,
    Media
} from './../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import {
    TinyDonutChartBig
} from "./components/TinyDonutChartBig";
import { CampaignAnalytics } from './CampaignAnalytics';
import {isAdmin, checkEnv} from '../../../utilities/admin';
import Load from '../../../utilities/load';

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            analytics: {},
        };

        this.fetchAnalytics = this.fetchAnalytics.bind(this);
    }

    async componentDidMount() {
        if (await checkEnv() === false) {
            return this.props.history.push("/setup");
        }else if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }else{
            this.fetchAnalytics();
        }
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
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        } else{
            return(
                <Container>
                    <Row>
                        <Col md={3}>
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
                        <Col md={3}>
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
                        <Col md={3}>
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
                        <Col md={3}>
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
                    <Row>
                        <Col lg={ 6 } md={ 6 }>
                            <div className="hr-text hr-text-left my-2">
                                <span>Participants</span>
                            </div>
                            <Media>
                                <Media left className="mr-3">
                                    <TinyDonutChartBig stats={stats.participantStats} />
                                </Media>
                                <Media body>
                                    <div>
                                        <i className="fa fa-circle mr-1 text-primary"></i>
                                        <span className="text-inverse">{stats.participantStats.active}</span> Active Participant
                                    </div>
                                    <div>
                                        <i className="fa fa-circle mr-1 text-success"></i>
                                        <span className="text-inverse">{stats.participantStats.invited}</span> Invited Participant
                                    </div>
                                    <div>
                                        <i className="fa fa-circle mr-1 text-purple"></i>
                                        <span className="text-inverse">{stats.participantStats.flagged}</span> Flagged Participant
                                    </div>
                                </Media>
                            </Media>
                        </Col>
                        <Col lg={6}>
                            <div className="hr-text hr-text-left my-2">
                                <span>Others</span>
                            </div>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td className="text-inverse bt-0">Redemmed Rewards</td>
                                        <td className="text-right bt-0">
                                            <Badge color="success" pill>{`$${stats.redeemedCredits}`}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-inverse">Awaiting Payouts</td>
                                        <td className="text-right">
                                            <Badge color="primary" pill>{`$${stats.awaitingPayouts}`}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-inverse">Flagged Customers</td>
                                        <td className="text-right">
                                            <Badge color="red" pill>{stats.customerStats.flagged_customers}</Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="12">
                            <CampaignAnalytics />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <div className="hr-text hr-text-left my-2">
                                <span>Social Media Shares</span>
                            </div>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td className="text-inverse bt-0">Facebook Shares</td>
                                        <td className="text-right bt-0">
                                            <Badge color="facebook" pill>{stats.mediaStats.fb_shares}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-inverse">Twitter Shares</td>
                                        <td className="text-right">
                                            <Badge color="primary" pill>{stats.mediaStats.twitter_shares}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-inverse">Email Shares</td>
                                        <td className="text-right">
                                            <Badge color="secondary" pill>{stats.mediaStats.email_shares}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-inverse">Linkedin Shares</td>
                                        <td className="text-right">
                                            <Badge color="teal" pill>{stats.mediaStats.linkedin_shares}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-inverse">Whatsapp Shares</td>
                                        <td className="text-right">
                                            <Badge color="green" pill>{stats.mediaStats.whatsapp_shares}</Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    
                </Container>
            )
        }
        
    }
}