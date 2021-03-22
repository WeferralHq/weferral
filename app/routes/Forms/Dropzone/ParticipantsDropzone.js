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
    FilesList
} from './components';
import Fetcher from '../../../utilities/fetcher';
import Load from '../../../utilities/load';
import port from '../../../port';
import {isParticipant} from '../../../utilities/admin';
import Cookie from 'js-cookie';

class ParticipantDropzone extends React.Component {
    constructor() {
        super();
        this.state = {
            isOver: false,
            files: [],
            assets: [],
            loading: true,
            campaignId: 0,
            listStyle: 'grid'
        }
    }

    async componentDidMount(){
        let self = this;
        let pid = Cookie.get('pid');
        if (await isParticipant() === false) {
            return this.props.history.push("/login");
        }
        let imgArr = [];
        Fetcher(`${port}/api/v1/system-options/participant/file/brand_assets/${pid}`).then((res) => {
            console.log(res);
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
            self.setState({assets: imgArr, loading: false});
        });
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
            const assets = this.state.assets;
            return (
                <Container>
                    <h3>Shareable Assets</h3>
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
                                        <FilesGrid files={ assets } /> :
                                        <FilesList files={ assets } />
                                }
                            </div>
                        )
                    }
                </Container>
            );
        }
    }
}

export default ParticipantDropzone;