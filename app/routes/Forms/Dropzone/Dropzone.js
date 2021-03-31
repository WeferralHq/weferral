import React from 'react';
import classNames from 'classnames';
import FileDrop from 'react-dropzone';
import _ from 'lodash';

import {
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    EmptyLayout,
    Container,
    Divider,
    Badge,
    Button,
    ButtonGroup
} from './../../../components';
import {
    FilesGrid,
    FilesList,
    UploadsGrid
} from './components';
import Fetcher from '../../../utilities/fetcher';
import Load from '../../../utilities/load';
import port from '../../../port';
import {isAdmin} from '../../../utilities/admin';

import { HeaderMain } from "../../components/HeaderMain";

export class Dropzone extends React.Component {
    constructor() {
        super();
        this.state = {
            isOver: false,
            files: [],
            campaign: [],
            assets: [],
            loading: true,
            admin: false,
            campaignId: 0,
            listStyle: 'grid'
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this._filesDropped = this._filesDropped.bind(this);
        this._removeFile = this._removeFile.bind(this);
    }

    async componentDidMount(){
        let self = this;
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        Fetcher(`${port}/api/v1/campaigns`).then((res) => {
            console.log(res);
            if(!res.err){
                self.setState({campaign : res});
            }
            self.setState({loading:false, admin: true});
        });
    }

    handleChange(e){
        if(e != undefined)
            e.preventDefault();
        let self = this;
        let target = e.target;
        let value = target.value;
        let imgArr = [];
        Fetcher(`${port}/api/v1/system-options/file/brand_assets/${value}`).then((res) => {
            if(!res.err){
                imgArr = res;
                return imgArr;
            }
        }).then(function (imgArr){
            imgArr.map(function (img){
                img.type = img.url.split('.').pop();
                img.name = img.file_name;
            })
            console.log(imgArr);
            const {assets, campaignId} = self.state;
            if(assets.length === 0 && campaignId === 0){
                self.setState({assets: imgArr, campaignId: value});
            }
        })
    }

    deleteFile(file){
       if(file){
        let self = this;
        let imgArr = [];
        Fetcher(`${port}/api/v1/system-options/file/${file.id}`, 'DELETE').then((res) => {
            if(!res.err){
                imgArr = res;
            }
        }).then(function (imgArr){
            imgArr.map(function (img){
                img.type = img.url.split('.').pop();
                img.name = img.file_name;
            })
            console.log(imgArr);
            self.setState({assets: imgArr});
        })
       }
        
    }

    _filesDropped(files){
        console.log(files);
        this.setState({
            files: [...this.state.files, ...files],
            isOver: false
        })
    }

    _removeFile(file){
        this.setState({
            files: _.reject(this.state.files, file)
        })
    }

    onSubmit(e){
        if(e != undefined)
            e.preventDefault();
        let self = this;
        let files = self.state.files;
        console.log(files);
        files.map(function (file){
            const formData = new FormData();
            formData.append(
                'file',
                file,
                file.name
            )
            let init = { method: "POST",
                credentials : "include",
                body : formData
            };
            console.log(formData.get('file'));

            Fetcher(`${port}/api/v1/system-options/file/brand_assets/${self.state.campaignId}`, null, null, init).then(function(result){
                if(!result.error){
                    
                }else{
                    self.setState({imageFailed: result.error});
                }
            }).catch(e => {console.error("error uploading img", e)});
        })

    }

    render() {
        const { isOver, files, listStyle } = this.state;
        const dropzoneClass = classNames({
            'dropzone--active': isOver
        }, 'dropzone');
        if(this.state.loading){
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }else{
            const id = this.state.campaignId;
            const assets = this.state.assets;
            return (
                <Container>
                    <h3>Shareable Assets</h3>
                    <Form>
                        <FormGroup>
                            <Col sm={12}>
                                <Input type="select" onChange={(e) => this.handleChange(e)} name="select" id="defaultSelect">
                                    <option defaultValue="">Select Campaign</option>
                                    {this.state.campaign.map(camp => (
                                        <option value={camp.id}>{camp.name}</option>))}
                                </Input>
                            </Col>
                        </FormGroup>
                    </Form>
                    {assets.length > 0 && (
                            <div className="mt-2">
                                <div className="d-flex">
                                    <Divider position="left" className="flex-shrink-1 flex-grow-1">
                                        <div className="px-2">
                                            Brand Assets
                                            <Badge
                                                className="ml-1 text-white"
                                                pill
                                                color="secondary"
                                            >
                                                { assets.length }
                                            </Badge>
                                        </div>
                                    </Divider>
                                    <ButtonGroup className="flex-grow-0 flex-shrink-0 pl-2">
                                        <Button
                                            active={ listStyle === 'list' }
                                            onClick={() => {this.setState({listStyle: 'list'})}}
                                            size="sm"
                                            outline
                                        >
                                            <i className='fa fa-bars fa-fw'></i>
                                        </Button>
                                        <Button
                                            active={ listStyle === 'grid' }
                                            onClick={() => {this.setState({listStyle: 'grid'})}}
                                            size="sm"
                                            outline
                                        >
                                            <i className='fa fa-th-large fa-fw'></i>
                                        </Button>
                                    </ButtonGroup>
                                </div>
                                {
                                    listStyle === 'grid' ?
                                        <FilesGrid files={ assets } onDeleteFile={this.deleteFile()} admin={this.state.admin}/> :
                                        <FilesList files={ assets } onDeleteFile={this.deleteFile()} admin={this.state.admin} />
                                }
                            </div>
                        )
                    }
                    { /*    DropZone    */ }
                    {id > 0 && <div className="mb-4">
                        <FileDrop
                            multiple
                            onDragEnter={() => { this.setState({isOver: true}) }}
                            onDragLeave={() => { this.setState({isOver: false}) }}
                            onDrop={this._filesDropped}
                        >
                            {
                                ({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className={dropzoneClass}>
                                        <i className="fa fa-cloud-upload fa-fw fa-3x mb-3"></i>
                                        <h5 className='mt-0'>
                                            Upload Your files
                                        </h5>
                                        <p>
                                            Drag a file here or <span className='text-primary'>browse</span> for a file to upload.
                                        </p>
                                        <input { ...getInputProps() } />
                                    </div>
                                )
                            }
                            
                        </FileDrop>
                    </div>}
                    {files.length > 0 && (
                        <div className="mt-2">
                            <div className="d-flex">
                                <Divider position="left" className="flex-shrink-1 flex-grow-1">
                                    <div className="px-2">
                                        Attachments
                                        <Badge className="ml-1 text-white" pill color="secondary">
                                            {files.length}
                                        </Badge>
                                    </div>
                                </Divider>
                            </div>
                            <UploadsGrid files={ files } onFileRemove={() => this._removeFile()} />
                            <Button color="primary" onClick={() => { this.onSubmit() }}>
                                Upload
                            </Button>
                        </div>
                    )}
                    { /*    Files List    */}
                </Container>
            );
        }
    }
}