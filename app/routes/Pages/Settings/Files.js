import React from 'react';
import {
    Col,
    Row,
    Button,
    HolderProvider,
    CardImg,
    Input,
    CustomInput,
    UncontrolledModal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            campaigns : [],
            files: [],
            file: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchFiles = this.fetchFiles.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        let self = this;
        Fetcher(`${port}/api/v1/campaigns/`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({campaigns: response, loading: false});
                //console.log(self.state.campaigns);
            }
        });
    }

    fetchFiles(){
        let self = this;
        let id = self.state.campaign_id;
        Fetcher(`${port}/api/v1/system-options/file/${id}`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({files: response});
                //console.log(self.state.campaigns);
            }
        });
    }

    handleFileUpload(e){
        e.persist();
        
        let self = this;
        let file = e.target.files[0];
        let name = e.target.name;
        
        self.setState({file: file, name: name});
        console.log(file);
    }

    handleChange(e){
        let self = this;
        let target = e.target;
        let value = target.value;
        let name = target.name;

        self.setState({[name]: value});
    }

    onSubmit(e){
        //e.preventDefault();
        let self = this;

        const payload = {
            name: self.state.name,
            image: self.state.file
        }
        console.log(JSON.stringify(payload));

        Fetcher(`${port}/api/v1/system-options/file/${self.state.campaign_id}`, 'POST', payload).then((res) => {
            //this.props.history.push('/settings');
        }, (error) => {
            console.log(error);
        });
    }

    render(){
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        }else{
            return(
                <React.Fragment>
                    <Input type="select" onChange={this.handleChange}
                        name="campaign_id"
                        id="defaultSelect"
                    >
                        <option defaultValue="">Select Campaign</option>
                        {this.state.campaigns.map(camp => (
                            <option value={camp.id}>{camp.name}</option>))}
                    </Input>
                    <br></br>
                    <Row>
                        <Col>
                            <h6 className="mb-2">
                                Brand Logo
                        </h6>
                            <figure className="figure mr-2">
                                <HolderProvider.Icon iconChar="" size={32} width={125}
                                    height={125}
                                >
                                    <CardImg className="rounded" />
                                </HolderProvider.Icon>
                            </figure>
                            <Button id="modalUploadLogo" color="primary" outline size="sm">
                                Upload Logo
                        </Button>
                            <UncontrolledModal target="modalUploadLogo" size="lg">
                                <ModalHeader tag="h5">
                                    Upload Logo
                            </ModalHeader>
                                <ModalBody>
                                    <CustomInput type="file" name="brand_logo" id="uploadYourFile" onChange={this.handleFileUpload} label="Browse for a file to upload...." />
                                </ModalBody>
                                <Button color="primary" size="md" onClick={() => { this.onSubmit() }}>Upload</Button>
                                <ModalFooter>
                                    <UncontrolledModal.Close color="link" className="text-primary" size="lg">
                                        Close
                                </UncontrolledModal.Close>
                                </ModalFooter>
                            </UncontrolledModal>
                        </Col>
                    </Row>
                </React.Fragment>
                
            )
        }
    }
}

export default File;