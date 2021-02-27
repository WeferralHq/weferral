import React from 'react';
import { 
    EmptyLayout,
    Badge,
    Button,
    Container,
    Row,
    Col,
    CustomInput,
    Input,
    Card,
    CardBody,
    Label,
    FormGroup,
    Form
} from '../../../components';
import Load from '../../../utilities/load';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import {WebhookModal,WebhookEdit} from './Modal';
import DeleteModal from '../../components/DeleteModal';
import {isAdmin} from '../../../utilities/admin';

export class Webhook extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            alerts: {},
            currentDataObject: {},
            hooks: [],
            rows: [],
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchWebhooks = this.fetchWebhooks.bind(this);
    }

    async componentDidMount() {
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        this.fetchData();
        this.fetchWebhooks();
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

    fetchWebhooks(campaign_id){
        let self = this;
        let url = !campaign_id ? `${port}/api/v1/webhooks` : `${port}/api/v1/webhooks/${campaign_id}`;
        Fetcher(url).then(function (response) {
            if(response.message === 'Webhooks not found'){
                self.setState({hooks: []});
            }else{
                self.setState({hooks: response});
            }
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
        let value = target.value;
        alert(value);
        self.fetchWebhooks(value);

        //self.setState({[name]: value});
    }

    render(){
        let pageName = 'Integrations';
        let subtitle = 'Integrate apps with Weferral';
        if(this.state.loading){
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }else{
            let hooks = this.state.hooks;
            return(
                <React.Fragment>
                    <h3>Webhooks</h3>
                    <Card className="mb-3">
                        <CardBody className="d-flex">
                            <div>
                                <p>Weferral can send webhook events that notify your application or third-party system any time an event happens.
                                Use it for events, like new customer conversion or Payout due time, that
                                your application needs to know about.</p>
                            </div>
                        </CardBody>
                    </Card>
                    <WebhookModal rows={this.state.rows}/>
                    <br/>
                    <Form>
                        <FormGroup row>
                            <Input type="select" onChange={this.handleChange}
                                name="campaignId"
                                id="defaultSelect"
                            >
                                <option defaultValue="">Select Campaign</option>
                                {this.state.rows.map(camp => (
                                    <option value={camp.id}>{camp.name}</option>))}
                            </Input>
                        </FormGroup>
                    </Form>
                    <div>
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
                                    
                                    <Row>
                                        <Col md={4}>
                                            <div className="url">{hook.endpoint_url}</div>
                                        </Col>
                                        <Col md={4}>
                                            {type}
                                            {health}
                                        </Col>
                                        <Col md={4}>
                                            <WebhookEdit text="Edit" hook={hook}/>
                                            {/*<Button color="primary" outline size="sm" onClick={() => {
                                                this.openHookForm(hook)
                                            }} type="submit" value="submit"><i className="fa fa-pencil"></i> Edit
                                            </Button>*/}
                                            <DeleteModal size="sm" id={hook.id} text="Delete" color="primary" outline={true} icon="fa fa-times" />
                                            {/*<Button color="primary" outline size="sm" onClick={() => {
                                                this.deleteHook(hook)
                                            }} type="submit" value="submit"><i className="fa fa-times"></i> Delete
                                            </Button>*/}
                                        </Col>

                                    </Row>
                                </div>
                            )
                        })}

                    </div>
                </React.Fragment>
            )
        }
    }
}