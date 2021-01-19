import React from 'react';
import {
    Row,
    Col,
    Button,
    ButtonToolbar,
    Input,
    Form,
    FormGroup,
    Label,
    UncontrolledModal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from './../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';

export class ImportButton extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            campaign: []
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let self = this;
        let url = `${port}/api/v1/campaigns`;
        Fetcher(url).then(function (response) {
            if (!response.error) {
                self.setState({campaign: response});
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

    handleSubmit(){
        let self = this;
        alert(self.state.campaign_id);
        let payload = {email: self.state.email}
        Fetcher(`${port}/api/v1//participant/invite/${self.state.campaign_id}`, 'POST', payload).then(function(response){
            if(!response.error){
                console.log('SUCCESS');
            }
        });
    }

    render(){
        return(
            <React.Fragment>
                <Row>
                    <Col lg={ 6 }>
                    <Form>
                    <FormGroup>
                        <Input type="select" onChange={this.handleChange}
                            name="select"
                            id="defaultSelect"
                        >
                            <option defaultValue="">Select Campaign</option>
                            {this.state.campaign.map(camp => (
                                <option value={camp.id}>{camp.name}</option>))}
                        </Input>
                    </FormGroup>
                </Form>
                    </Col>
                
                <Col lg={6}>
                    <ButtonToolbar className="ml-auto">
                        <Button color="primary" size="md" className="mr-2">
                            Import Participants
                        </Button>
                        <Button id="modalDefault203" color="primary" outline size="md">
                            Invite Participant
                        </Button>
                        <UncontrolledModal target="modalDefault203" size="md">
                            <ModalHeader>
                                Enter the Email
                            </ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Input type="select" onChange={this.handleChange}
                                            name="campaign_id"
                                            id="defaultSelect"
                                        >
                                            <option defaultValue="">Select Campaign</option>
                                            {this.state.campaign.map(camp => (
                                                <option value={camp.id}>{camp.name}</option>))}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="text" onChange={this.handleChange} name="email" placeholder="Enter Email" />
                                    </FormGroup>
                                    <Button color="primary" size="lg" onClick={ () => this.handleSubmit() }>Invite</Button>
                                        
                                    
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <UncontrolledModal.Close color="link" className="text-primary" size="lg">
                                    Close
                            </UncontrolledModal.Close>
                            </ModalFooter>
                        </UncontrolledModal>
                    </ButtonToolbar>
                </Col>
                </Row>
                
            </React.Fragment>
        )
    }
    
}
