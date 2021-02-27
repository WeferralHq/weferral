import React from 'react';

import { 
    EmptyLayout,
    UncontrolledAlert,
    Button,
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';
import update from 'immutability-helper';
import {isAdmin} from '../../../utilities/admin';
import Load from '../../../utilities/load';
let _ = require("lodash");

export class EditParticipant extends React.Component {

    constructor(props) {
        super(props);
        let id = this.props.match.params.id || null;
        this.state = {
            loading : true,
            participant : {},
            alerts: {},
            url : `${port}/api/v1/participant/${id}`,
            updateUrl: `${port}/api/v1/participants/${id}`
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        //this._handleChange = this._handleChange.bind(this);
        this.handleUpdateparticipant = this.handleUpdateparticipant.bind(this);
    }

    async componentDidMount() {
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        this.fetchData();
    };

    fetchData() {
        let self = this;
        Fetcher(self.state.url).then(function(response){
            if(!response.error){
                console.log("participant", response);
                self.setState({loading: false, participant: response});
            }else{
                console.log("Error", response);
                self.setState({loading: false});
            }
        });
    }

    handleChange(e) {
        let self = this;
        let value = e.currentTarget.value;
        let name = e.currentTarget.name;
        
        const newData = update(self.state,
            {system_settings: {
                    [name]:{value: {$set: value}}
                }
            }
        );
        self.setState(newData);
        //alert(JSON.stringify(self.state.system_settings));
    }

    handleUpdateparticipant(){
        let self = this;
        let payload = _.toArray(self.state.participant);
        // console.log("payload", payload);
        Fetcher(self.state.updateUrl, 'PUT', payload).then(function(response){
            if(!response.error){
                console.log('success')
                self.setState({
                    alerts: {
                        color: 'success',
                        icon: 'times',
                        message: `You successfully updated the participant`
                    }
                });
                
                //self.props.onUpdateSettings();
            }else{
                console.log('Problem PUT /api/v1/participants');
            }
        });
    }

    render() {
        if(this.state.loading){
            return (
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        } else{
            let participant =this.state.participant;
            return (
                <React.Fragment>
                    {(this.state.alerts && this.state.alerts.message) &&
                        <UncontrolledAlert color={this.state.alerts.color} >
                            {this.state.alerts.message}
                        </UncontrolledAlert>
                    }
                <Container>
                    <HeaderMain
                        title="Edit Participant"
                        className="mb-5 mt-4"
                    />
                    <Row>
                        <Col lg={12}>
                            <Card className="mb-3">
                                <CardBody>
                                    <Form>
                                        <FormGroup row>
                                            <Label for="fname" sm={3}>
                                                First Name
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="fname" id="fname" defaultValue={participant.data.fname} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="lname" sm={3}>
                                                Last Name
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="lname" id="lname" defaultValue={participant.data.lname} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="email" sm={3}>
                                                Email
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="text" name="email" id="email" defaultValue={participant.data.email} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="password" sm={3}>
                                                Change Password
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="password" name="password" id="password" />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="password2" sm={3}>
                                                Confirm Password
                                            </Label>
                                            <Col sm={9}>
                                                <Input type="password" name="password2" id="password2" />
                                            </Col>
                                        </FormGroup>
                                        <Button color='primary' onClick={() => { this.handleUpdateparticipant() }} className="ml-auto px-4">
                                            Update
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
            )
            
        }
    }
}