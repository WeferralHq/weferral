import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { 
    Badge,
    Button,
    Container,
    Row,
    Col,
    CustomInput,
    Input,
    Card,
    Label,
    FormGroup,
    Form,
    UncontrolledModal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';

export class Webhook extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            alerts: {},
            currentDataObject: {},
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
        this.webhookForm = this.webhookForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let self = this;
        let url = `${port}/api/v1/campaigns`;
        Fetcher(url).then(function (response) {
            if (!response.error) {
                self.setState({rows: response});
            }
            self.setState({loading: false});
        });
    }

    deleteHook(hook) {
        let self = this;
        Fetcher('/api/v1/webhooks/' + hook.id, "DELETE").then(function (response) {
            if (!response.error) {
                self.fetchData();
            }
        });

    }

    handleChange(e) {
        let self = this;
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        self.setState({[name]: value});
    }

    webhookForm(){
        let self = this;
        return (
            <div>
                <Button id="webhookModal" color="primary" size="md"></Button>
                <UncontrolledModal target="webhookModal">
                    <ModalHeader tag="h6">
                        Modal: Default
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="defaultSelect" sm={3}>
                                    Select Campaign
                                </Label>
                                <Col sm={9}>

                                    <Input type="select" onChange={this.handleChange}
                                        name="select"
                                        id="defaultSelect"
                                    >
                                        <option defaultValue="">Select Campaign</option>
                                        {this.state.campaign.map(camp => (
                                            <option value={camp.id}>{camp.name}</option>))}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Input name="endpoint_url" type="text" placeholder="Endpoint URL: https://" />
                            </FormGroup>
                            <FormGroup>
                                <CustomInput onChange={this.handleChange} type="select"
                                    name="asynchronous"
                                    id="asynchronous">
                                    <option value="True">Asynchronous</option>
                                    <option value="False">Synchronous</option>
                                </CustomInput>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <UncontrolledModal.Close color="link" className="text-primary">
                            Close
                        </UncontrolledModal.Close>
                        <UncontrolledModal.Close color="primary" onClick={() => { this.onSubmit() }} >
                            Save
                        </UncontrolledModal.Close>
                    </ModalFooter>
                </UncontrolledModal>
            </div>
            
        )
    }

    render(){
        let pageName = 'Integrations';
        let subtitle = 'Integrate apps with Weferral';
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        }else{
            return(
                <React.Fragment>
                    <h3>Webhooks</h3>
                    <p>Weferral can send webhook events that notify your application or third-party system any time an event happens.
                        Use it for events, like new customer conversion or Payout due time, that
                        your application needs to know about.</p>
                    {this.webhookForm}

                    <div className="form-row">
                        {hooks.map((hook, index) => {
                            //Set health check
                            let health = <span><Badge pill color="red"><i
                                className="fa fa-times"></i>{hook.health}</Badge> </span>;
                            if (!hook.health) {
                                health = <span><Badge pill color="primary">Test Endpoints</Badge></span>;
                            } else if (hook.health === 'OK') {
                                health = <span><Badge pill color="info"><i className="fa fa-check"></i></Badge></span>;
                            }
                            //Set Type
                            let type = <span className="m-r-5"><Badge pill color="blue">Asynchronous</Badge></span>;
                            if (hook.async_lifecycle === false) {
                                type = <span className="m-r-5"><Badge pill color="purple">Synchronous</Badge></span>;
                            }
                            return (
                                <div className="hook" key={"hook-" + index}>
                                    <div className="url">{hook.endpoint_url}</div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <span>{type}</span>
                                            <span>{health}</span>
                                        </div>
                                        <div className="hook-actions col-md-4">
                                            <Button color="primary" outline size="lg" onClick={() => {
                                                this.openHookForm(hook)
                                            }} type="submit" value="submit"><i className="fa fa-pencil"></i> Edit
                                            </Button>
                                            <Button color="primary" outline size="lg" onClick={() => {
                                                this.deleteHook(hook)
                                            }} type="submit" value="submit"><i className="fa fa-times"></i> Delete
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </React.Fragment>
            )
        }
    }
}