import React from 'react';
import {
    Row,
    Col,
    Button,
    ButtonToolbar,
    Input,
    CustomInput,
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
import ImportCsv from '../../../utilities/import';

export class ImportButton extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            campaign: [],
            files: []
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSubmit = this.fileSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
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

    handleFileUpload(e) {
        let self = this;
        const file = e.target.files[0];
        const files = ImportCsv(file);
        self.setState({files: files});
        console.log(self.state.files);
    }

    fileSubmit(){
        let self = this;
        let files = self.state.files;
        files.shift();
        files.map((file) => {
            Fetcher(`${port}/api/v1//participant/invite/${self.state.campaign_id}`, 'POST', file).then(function (response) {
                if (!response.error) {
                    console.log('SUCCESS');
                }
            });
        })
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
                        <Button color="primary" id="modalImportParticipant" size="md" className="mr-2">
                            Import Participants
                        </Button>
                        <UncontrolledModal target="modalImportParticipant" size="lg">
                            <ModalHeader tag="h5">
                                Import Participants
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
                                        <CustomInput type="file" accept=".csv,.xlsx,.xls" id="uploadYourFile" onChange={this.handleFileUpload} name="customFile" label="Browse for a file to upload...." />
                                        </FormGroup>
                                </Form>
                                <Button color="primary" size="lg" onClick={ () => this.fileSubmit() }>Upload</Button>
                            </ModalBody>
                            <ModalFooter>
                                <UncontrolledModal.Close color="link" className="text-primary" size="lg">
                                    Close
                                </UncontrolledModal.Close>
                            </ModalFooter>
                        </UncontrolledModal>
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
