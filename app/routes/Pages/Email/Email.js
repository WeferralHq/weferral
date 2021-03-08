import React from 'react';
import { 
    EmptyLayout,
    Container,
    Row,
    Col,
    Input,
    Card,
    Button,
    CardBody,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Table
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import {isAdmin} from '../../../utilities/admin';

import {
    HeaderDemo
} from "../../components/HeaderDemo";

import {
    TrTableDefault
} from "./components/TrTableDefault";
import Fetcher from '../../../utilities/fetcher';
import Load from '../../../utilities/load';
import port from '../../../port';


export class Email extends React.Component {
    constructor() {
        super();
        
        this.state = {
            campaign: [],
            templates: [],
            loading: true
        };

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        let self = this;
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        //alert('this');
        Fetcher(`${port}/api/v1/campaigns`).then((res) => {
            if(!res.err){
                self.setState({campaign : res});
            }
            self.setState({loading:false});
        });
    }

    handleChange(e) {
        let self = this;
        let id = e.target.value;
        Fetcher(`${port}/api/v1/notification-templates/${id}`).then((res) => {
            if(!res.err){
                self.setState({templates : res});
            }
            //self.setState({loading:false});
        });
    }

    render() {
        if(this.state.loading === false){
            let { campaign, templates} = this.state;
            return (
                <React.Fragment>
                    <Container>
                        <HeaderMain
                            title="Email Notifications"
                            className="mb-5 mt-4"
                        />
                        <Row>
                            <Col lg={12}>
                                <Card className="mb-3">
                                    <CardBody>
                                        <CardTitle tag="h6" className="mb-4">
                                            Select Campaign
                                    </CardTitle>
                                        { /* START Form */}
                                        <Form>
                                            { /* START Select */}
                                            <FormGroup row>
                                                <Label for="defaultSelect" sm={3}>
                                                    Select Campaign
                                            </Label>
                                                <Col sm={9}>

                                                    <Input
                                                        type="select"
                                                        onChange={this.handleChange}
                                                        name="select"
                                                        id="defaultSelect"
                                                    >

                                                        <option defaultValue="">Select Campaign</option>
                                                        {campaign.map(camp => (
                                                            <option value={camp.id}>{camp.name}</option>))}
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            { /* END Select */}
                                        </Form>
                                        { /* END Form */}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        { /* END Header 1 */}
                        { /* START Section 1 */}
                        {templates.length > 0 && <Row>
                            <Col lg={12}>
                                <Card className="mb-3">
                                    { /* START Table */}
                                    <Table className="mb-0" striped responsive>
                                        <thead>
                                            <tr>
                                                <th className="bt-0">Name</th>
                                                <th className="bt-0">Subject</th>
                                                <th className="bt-0">Publish</th>
                                                <th className="bt-0">Created Date</th>
                                                <th className="text-right bt-0">
                                                    Actions
                                    </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <TrTableDefault templates={templates} />
                                        </tbody>
                                    </Table>
                                    { /* END Table */}
                                </Card>
                            </Col>
                        </Row>}
                        { /* END Section 1 */}
                    </Container>
                </React.Fragment>
            )
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
    
};