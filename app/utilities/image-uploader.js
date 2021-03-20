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
} from '../components';
import Fetcher from '../utilities/fetcher.js';
import Load from '../utilities/load';
import port from '../port';

class ImageUploader extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            elementID: this.props.elementID,
            imageStyle: this.props.imageStyle,
            uploadMessage: this.props.uploadMessage || "Upload The Image",
            uploadFunction: this.props.uploadTrigger || false,
            uploadButton: this.props.uploadButton,
            imageURL: this.props.imageURL,
            loading: true,
            ajaxLoad: false,
            imageSelected: false,
            loadingImage: false,
            success: false,
            image: true,
            imageFailed: false,
            imageChanged : false
        };

        this.onImageSelected = this.onImageSelected.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.getCoverImage = this.getCoverImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.imageURL != this.state.imageURL){
            this.setState({
                imageURL: nextProps.imageURL
            });
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.uploadTrigger != prevProps.uploadTrigger){
            if(!this.state.imageChanged){
                if(this.props.handleSuccess){
                    return this.props.handleSuccess();
                }else{
                    return;
                }
            }
            this.handleImage();
        }
    }

    componentDidMount(){
        this.getCoverImage();
    }

    onImageSelected(e){
        let self = this;
        self.setState({loadingImage: true});
        let src = e.currentTarget;
        let targetImg = document.getElementById(`edit-${this.state.elementID}-img`);
        self.setState({loadingImage: false, imageSelected: true, image: true, imageChanged : true, selectedFile: src.files[0]}, function () {
            targetImg.classList.remove("no-image-yet");
        });
        let fileReader = new FileReader();

        fileReader.addEventListener("load", function () {
            targetImg.src = fileReader.result;
            /*self.setState({loadingImage: false, imageSelected: true, image: true, imageChanged : true}, function () {
                targetImg.classList.remove("no-image-yet");
            });*/
        }, false);

        fileReader.readAsDataURL(src.files[0]);

        if(this.props.onChange) {
            this.props.onChange();
        }
    }

    getCoverImage(){
        let self = this;
        let myImage = document.getElementById(`edit-${this.state.elementID}-img`);
        Fetcher(this.props.imageGETURL || self.state.imageURL).then(function(response){
            if(response){
                let img = response.logo;
                self.setState({hasImage: true});
                return img;
            }
            throw new Error('Network response was not ok.');
        }).then(function(imgUrl){
            fetch(imgUrl).then(function (response){
                return response.blob();
            }).then(function(myBlob) {
                if(myBlob.type == "text/html"){
                    throw "not an image";
                }
                let objectURL = URL.createObjectURL(myBlob);
                myImage.src = objectURL;
            })
        }).catch(function(error) {
            self.setState({image: false});
            // myImage.src = '/assets/custom_icons/cloud-computing.png?' + new Date().getTime();
            myImage.classList.add("no-image-yet");
        });
    }

    handleImage(e){
        if(e != undefined)
            e.preventDefault();
        let self = this;
        //let imgObj = document.getElementById(`edit-${this.state.elementID}-img`);
        const formData = new FormData();
        formData.append(
            'file',
            self.state.selectedFile,
            self.state.selectedFile.name
        )
        let init = { method: "POST",
            credentials : "include",
            body : formData
        };
        console.log(formData.get('file'));
        //let payload = {'file': self.state.selectedFile}

        self.setState({ajaxLoad: true});
        Fetcher(self.state.imageURL, null, null, init).then(function(result){
            if(!result.error){
                self.setState({imageSelected: false, ajaxLoad: false}, function () {
                    if(self.props.handleSuccess){
                        self.props.handleSuccess();
                    }
                    if(self.props.reloadNotice){
                        self.setState({success: true, reloadNotice: self.props.reloadNotice});
                    }
                });
            }else{
                self.setState({ajaxLoad: false, imageFailed: result.error});
            }
        }).catch(e => {console.error("error getting img", e)});
    }

    removeImage(e){
        let self = this;
        e.preventDefault();
        Fetcher(self.props.imageURL, "DELETE", null, null).then(function (response) {
            if(!response.error){
                self.setState({hasImage: false, image: false, imageChanged : true});
            }
        }).catch(e => {console.error("error removing img", e)});

    }

    render(){
        return(
            <Row>
                <Col className={`edit-${this.state.elementID}-image`}>
                    <form id={`imgform${this.state.elementID}`} className="image-uploader" encType="multipart/form-data">
                        <div className={`${this.state.imageStyle}`}>
                            <img id={`edit-${this.state.elementID}-img`} className={!this.state.image && 'hidden'}
                                 src={this.state.imageURL} ref="avatar" alt="badge" style={{
                                    height: '100px',
                                    marginRight: '10px',
                                    width: '100px',
                                }}/>
                                <br></br>
                            { this.state.loadingImage && <Load /> }
                            <CustomInput type="file" name={this.props.name || 'file'} id={this.state.elementID} onChange={this.onImageSelected} label="Browse for a file to upload...." />
                            {/*<input id={this.state.elementID} type="file" onChange={this.onImageSelected} name={this.props.name || 'file'}/>*/}
                        </div>
                        {(this.state.success && this.state.reloadNotice) &&
                            <div>
                                <span className="help-block"><small>{this.props.reloadNotice}</small></span>
                                <Button color="primary" onClick={()=>{return location.reload()}}
                                         position="center">Reload Application</Button>
                            </div>
                        }
                        {(this.state.imageSelected && this.state.uploadButton) &&
                        <div>
                            {/*<div className="image-upload-message"><small>{this.state.uploadMessage}</small></div>*/}
                            <Button color="primary" onClick={this.handleImage}
                                loading={this.state.ajaxLoad} success="" type="submit" position="center">Save Image</Button>
                        </div>
                        }
                    </form>
                    {(this.state.hasImage && this.props.imageRemovable) &&
                    <Button color="primary" onClick={this.removeImage}
                             loading={this.state.ajaxLoad} success="" position="center">Remove Image</Button>
                    }
                    {this.state.imageFailed &&
                    <span className="help-block image-failed">{this.state.imageFailed}</span>
                    }
                </Col>
            </Row>
        );
    }



}

export default ImageUploader;