import React from "react";
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

class WebhookModal extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        let rows = this.props.rows;
        this.state = {
            campaign: rows
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitHook = this.submitHook.bind(this);
    }

    submitHook() {
        let self = this;
        let payload = {
            campaign_id: self.state.campaign_id,
            endpoint_url: self.state.endpoint_url,
            async_lifecycle: self.state.async_lifecycle
        }
        Fetcher(port+'/api/v1/webhooks/', "POST", payload).then(function (response) {
            if (!response.error) {
                //self.fetchData();
                return;
            }
        });

    }

    handleChange(e) {
        let self = this;
        let target = e.target;
        let value = target.value;
        let name = target.name;
        self.setState({[name]: value});
    }

    render(){
        return(
            <div>
                <Button id="webhookModal" color="primary" size={ "md"}>{'Add Endpoint'}</Button>
                <UncontrolledModal target="webhookModal">
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label for="defaultSelect" sm={3}>
                                    Select Campaign
                                </Label>
                                <Col sm={9}>

                                    <Input type="select" onChange={this.handleChange}
                                        name="campaign_id"
                                        id="defaultSelect"
                                    >
                                        <option defaultValue="">Select Campaign</option>
                                        {this.state.campaign.map(camp => (
                                            <option value={camp.id}>{camp.name}</option>))}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Input name="endpoint_url"  type="text" onChange={this.handleChange} placeholder="Endpoint https://" />
                                
                            </FormGroup>
                            <FormGroup>
                                <CustomInput onChange={this.handleChange} type="select"
                                    name="async_lifecycle"
                                    id="asynchronous">
                                    <option value="true">Asynchronous</option>
                                    <option value="false">Synchronous</option>
                                </CustomInput>
                            </FormGroup>
                        </Form>
                        <Button color="primary" size="md" onClick={() => { this.submitHook() }}>Submit</Button>
                    </ModalBody>
                    <ModalFooter>
                        <UncontrolledModal.Close color="link" className="text-primary">
                            Close
                        </UncontrolledModal.Close>
                    </ModalFooter>
                </UncontrolledModal>
            </div>
        )
    }
}

class WebhookEdit extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submitHook = this.submitHook.bind(this);
    }

    submitHook() {
        let self = this;
        let payload = {
            endpoint_url: self.state.endpoint_url,
            async_lifecycle: self.state.async_lifecycle
        }
        Fetcher(port+'/api/v1/webhooks/', "POST", payload).then(function (response) {
            if (!response.error) {
                //self.fetchData();
                return;
            }
        });

    }

    handleChange(e) {
        let self = this;
        let target = e.target;
        let value = target.value;
        let name = target.name;

        self.setState({[name]: value});
    }

    render(){
        return(
            <React.Fragment>
                <Button id="webhookEdit" color="primary" outline size="sm"><i className="fa fa-pencil"></i>{this.props.text}</Button>
                <UncontrolledModal target="webhookEdit">
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input name="endpoint_url" defaultValue={this.props.hook.endpoint_url} type="text" onChange={this.handleChange} />
                                
                            </FormGroup>
                            <FormGroup>
                                <CustomInput onChange={this.handleChange} type="select"
                                    name="async_lifecycle"
                                    id="asynchronous">
                                    <option value="true">Asynchronous</option>
                                    <option value="false">Synchronous</option>
                                </CustomInput>
                            </FormGroup>
                        </Form>
                        <Button color="primary" size="md" onClick={() => { this.submitHook() }}>Submit</Button>
                    </ModalBody>
                    <ModalFooter>
                        <UncontrolledModal.Close color="link" className="text-primary">
                            Close
                        </UncontrolledModal.Close>
                    </ModalFooter>
                </UncontrolledModal>
            </React.Fragment>
        )
    }
}

export {WebhookModal, WebhookEdit};