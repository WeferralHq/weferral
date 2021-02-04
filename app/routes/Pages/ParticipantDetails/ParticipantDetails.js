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
import port from '../../../port';
import Cookies from 'js-cookie';
import { ProfileOverviewCard } from "../../components/Profile/ProfileOverviewCard";
import ShareCard from './ShareCard';

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

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let self = this;
        let id = Cookies.get("pid");
        alert(id);
        let url = `${port}/api/v1/participant/profile/${id}`;
        Fetcher(url).then(function (response) {
            if (!response.error) {
                self.setState({rows: response});
            }
            self.setState({loading: false});
        });
    }

    render() {
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        } else {
            return(
                <EmptyLayout>
                    <EmptyLayout.Section width={1080}>
                            <Container>
                                <Row>
                                    <Col lg={4}>
                                        <Card>
                                            <CardBody>
                                                <div className="d-flex justify-content-center my-3">
                                                    <Avatar.Image
                                                        size="lg"
                                                        src="http://bs4.webkom.co/img/avatars/2.jpg"
                                                        addOns={[
                                                            <AvatarAddOn.Icon
                                                                className="fa fa-circle"
                                                                color="white"
                                                                key="avatar-icon-white-bg"
                                                            />
                                                        ]}
                                                    />
                                                </div>
                                                <div className="mb-4 text-center">
                                                    <a className="h6 text-decoration-none" href="#">
                                                        {this.state.rows.name}
                                                    </a>
                                                </div>
                                                <Row className="mt-3">
                                                    <Col sm={12} md={12}>
                                                        <Button color="secondary" outline block tag={Link} to="/apps/profile-edit">
                                                            Edit
                                                </Button>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg={8}>
                                        <CardGroup className="mb-5">
                                            <Card body>
                                                <ProfileOverviewCard
                                                    title="Signups"
                                                    //badgeTitle="Monthly"
                                                    value={this.state.rows.totalsignups}
                                                    valueTitle="Total Signups"
                                                />
                                            </Card>
                                            <Card body>
                                                <ProfileOverviewCard
                                                    title="Customers"
                                                    //badgeTitle="Annual"
                                                    value={this.state.rows.totalcustomers}
                                                    valueTitle="Total Customers"
                                                />
                                            </Card>
                                            <Card body>
                                                <ProfileOverviewCard
                                                    title="Clicks"
                                                    value={this.state.rows.totalclicks}
                                                    valueTitle="Total Clicks"
                                                />
                                            </Card>
                                            <Card body>
                                                <ProfileOverviewCard
                                                    title="Awaiting Payouts"
                                                    value={`$${this.state.rows.awaitingpayout}`}
                                                    valueTitle="Total Awaiting Payouts"
                                                />
                                            </Card>
                                        </CardGroup>
                                        <ShareCard rows={this.state.rows}/>
                                    </Col>
                                </Row>
                            </Container>
                    </EmptyLayout.Section>
                </EmptyLayout>
                
            )
        }
    }

}