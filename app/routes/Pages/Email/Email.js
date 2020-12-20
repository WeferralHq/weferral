import React from 'react';

import { 
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    Table,
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";

import {
    HeaderDemo
} from "../../components/HeaderDemo";

import {
    TrTableDefault
} from "./components/TrTableDefault";
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';


export class Email extends React.Component {
    constructor() {
        super();
        
        this.state = {
            products: _.times(INITIAL_PRODUCTS_COUNT, generateRow),
            campaign: [],
            templates: [],
            loading: true
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        let self = this;
        Fetcher(`${port}/api/v1/campaign`).then((res) => {
            if(!res.err){
                self.setState({campaign : res});
            }
            self.setState({loading:false});
        });
    }

    handleChange(e) {
        let self = this;
        let id = e.target.id;
        Fetcher(`${port}/api/v1/notification-templates/${id}`).then((res) => {
            if(!res.err){
                self.setState({templates : res});
            }
            self.setState({loading:false});
        });
    }

    render() {
        let { campaign, templates} = this.state;
        return(
            <React.Fragment>
                <Container>
                    <HeaderMain
                        title="Tables"
                        className="mb-5 mt-4"
                    />
                    { /* START Header 1 */}
                    <Row>
                        <Col lg={12}>
                            <HeaderDemo
                                no={1}
                                title="Basic Tables"
                                subTitle={(
                                    <React.Fragment>
                                        All table styles are inherited in Bootstrap 4, meaning any nested tables will be styled in the same manner as the parent.
                                    </React.Fragment>
                                )}
                            />
                        </Col>
                    </Row>
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
                                                {campaign.map(camp => (
                                                <Input
                                                    type="select"
                                                    onChange={this.handleChange}
                                                    name="select"
                                                    id="defaultSelect"
                                                >
                                                    <option defaultValue="">Select Campaign</option>
                                                    <option id={camp.data.id}>{camp.data.name}</option>
                                                </Input>
                                                ))}
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
                    <Row>
                        <Col lg={12}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6">
                                        Table Default
                                    </CardTitle>
                                    <p className="mb-0">
                                        Using the most basic table markup, here’s how <code>.table-based</code> tables look in Bootstrap.
                                        All table styles are inherited in Bootstrap 4, meaning any nested tables will be styled in the
                                        same manner as the parent.
                                    </p>
                                </CardBody>
                                { /* START Table */}
                                <Table className="mb-0" responsive>
                                    <thead>
                                        <tr>
                                            <th className="bt-0">Name</th>
                                            <th className="bt-0">Subject</th>
                                            <th className="bt-0">Status</th>
                                            <th className="bt-0">Created Date</th>
                                            <th className="text-right bt-0">
                                                Actions
                                    </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TrTableDefault templates={templates.map(result => (result))}/>
                                    </tbody>
                                </Table>
                                { /* END Table */}
                            </Card>
                        </Col>
                    </Row>
                    { /* END Section 1 */}
                </Container>
            </React.Fragment>
        )
    }
    
};