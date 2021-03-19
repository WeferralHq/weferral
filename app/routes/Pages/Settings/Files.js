import React from 'react';
import {
    EmptyLayout,
    Input
} from '../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import ImageUploader from '../../../utilities/image-uploader';
import {isAdmin} from '../../../utilities/admin';
import Load from '../../../utilities/load';

class File extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            campaigns : [],
            files: [],
            id: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchFiles = this.fetchFiles.bind(this);
        //this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    async componentDidMount() {
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
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

    /*handleFileUpload(e){
        e.persist();
        
        let self = this;
        let file = e.target.files[0];
        let name = e.target.name;
        
        self.setState({asset: file, name: name});
        console.log(file);
    }*/

    handleChange(e){
        let self = this;
        let target = e.target;
        let value = target.value;
        //let value = target.type === "file" ? e.target.files[0] : target.value;
        let name = target.name;

        self.setState({id: value});
    }

    onSubmit(e){
        //e.preventDefault();
        let self = this;

        /*const payload = {
            name: self.state.name,
            image: self.state.image
        }
        console.log(JSON.stringify(payload));*/

        Fetcher(`${port}/api/v1/system-options/file/brand_logo/${self.state.id}`, 'POST').then((res) => {
            //this.props.history.push('/settings');
        }, (error) => {
            console.log(error);
        });
    }

    render(){
        if(this.state.loading){
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
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
                    {this.state.id > 0 && <ImageUploader name="file" elementID="brand-logo"
                                           imageURL={`${port}/api/v1/system-options/file/brand_logo/${this.state.id}`}
                                           imageStyle="badge badge-lg" uploadButton={true}
                                           reloadNotice="Please reload the application."
                    />}
                    {/*<Row>
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
                                    <Input type="text" name="name" value="brand_logo" onChange={this.handleChange} hidden />
                                    <CustomInput type="file" name="image" id="uploadYourFile" onChange={this.handleChange} label="Browse for a file to upload...." />
                                </ModalBody>
                                <Button color="primary" size="md" onClick={() => { this.onSubmit() }}>Upload</Button>
                                <ModalFooter>
                                    <UncontrolledModal.Close color="link" className="text-primary" size="lg">
                                        Close
                                </UncontrolledModal.Close>
                                </ModalFooter>
                            </UncontrolledModal>
                        </Col>
                    </Row>*/}
                </React.Fragment>
                
            )
        }
    }
}

export default File;