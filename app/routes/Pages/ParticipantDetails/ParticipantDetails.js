import React from 'react';
import { Link } from 'react-router-dom';

import { 
    Avatar,
    AvatarAddOn,
    Container,
    EmptyLayout,
    Row,
    Col,
    Card,
    Button,
    CardBody,
    CardGroup
} from './../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import Load from '../../../utilities/load';
import port from '../../../port';
import Cookies from 'js-cookie';
import { ProfileOverviewCard } from "../../components/Profile/ProfileOverviewCard";
import ShareCard from './ShareCard';
import {isParticipant} from '../../../utilities/admin';
import Cookie from 'js-cookie';

export class ParticipantDetails extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            rows: {},
            currentDataObject: {},
            lastFetch: Date.now(),
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        if (await isParticipant() === false) {
            let campaignName = Cookie.get('cName');
            return this.props.history.push(`/${campaignName}/login`);
        }else{
            this.fetchData();
        }
    }

    fetchData() {
        let self = this;
        let id = Cookies.get("pid");
        let url = `${port}/api/v1/participant/profile/${id}`;
        Fetcher(url).then(function (response) {
            if (!response.error) {
                console.log(response);
                self.setState({rows: response});
            }
            self.setState({loading: false});
        });
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
        } else {
            return(
                <Container>
                    <Row>
                        <Col lg={12}>
                            <CardGroup className="mb-5">
                                <Card>
                                    <CardBody>
                                        <ProfileOverviewCard
                                            title="Signups"
                                            //badgeTitle="Monthly"
                                            value={this.state.rows.participantStats.totalsignups}
                                            valueTitle="Total Signups"
                                        />
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <ProfileOverviewCard
                                            title="Customers"
                                            //badgeTitle="Annual"
                                            value={this.state.rows.participantStats.totalcustomers}
                                            valueTitle="Total Customers"
                                        />
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <ProfileOverviewCard
                                            title="Clicks"
                                            value={this.state.rows.participantStats.totalclicks}
                                            valueTitle="Total Clicks"
                                        />
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <ProfileOverviewCard
                                            title="Awaiting Payouts"
                                            value={`$${this.state.rows.participantStats.awaitingpayout}`}
                                            valueTitle="Total Awaiting Payouts"
                                        />
                                    </CardBody>
                                </Card>
                            </CardGroup>
                            <ShareCard rows={this.state.rows} />
                        </Col>
                    </Row>
                </Container>
                
            )
        }
    }

}