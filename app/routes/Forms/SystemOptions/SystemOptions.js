import React from 'react';
import ReactQuill from 'react-quill';
import faker from 'faker/locale/en_US';

import { 
    Button,
    Container,
    Row,
    Col,
    Input,
    Card,
    Label,
    FormGroup,
    Form
} from '../../../components';
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';

import { HeaderMain } from "../../components/HeaderMain";
let _ = require("lodash");

export class CampaignSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            system_settings: false,
            loading : true,
            campaigns : [],
            text: '',
            id: 0,
            url : `${port}/api/v1/campaigns/`
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        //this._handleChange = this._handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        let self = this;
        alert('this');
        Fetcher(`${port}/api/v1/campaigns/`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({campaigns: response, loading: false});
                //console.log(self.state.campaigns);
            }
        });
    }

    handleChange(e) {
        let value = e.target.value;
        let self = this;
        self.setState({id: value});
        Fetcher(`${port}/api/v1/campaign-system-options/${value}`).then(function(response){
            if(!response.error){
                console.log("system-settings", response);
                self.setState({loading: false, system_settings: response});
            }else{
                console.log("system setting error", response);
                self.setState({loading: false});
            }
        });
    }

    onSubmit() {
        let self = this;
        let payload = {description: self.state.text}
        Fetcher(`${port}/api/v1/campaign-page/${self.state.id}`, 'POST', payload).then(function(response){
            if(!response.error){
                console.log('SUCCESS');
            }
        });
    }

    render() {
        if(this.state.loading === false){
            let group = _.groupBy(this.state.system_settings, (setting)=>{return setting.type ? setting.type : "other"});
            console.log(JSON.stringify(group));
            //let types = _.uniq(_.map(this.state.system_settings, (setting) => setting.type));
            return (
                <Container>
                    <HeaderMain 
                        title="Settings"
                        className="mb-5 mt-4"
                    />
                        <Form>
                            <FormGroup>
                                <Label for="defaultSelect" sm={3}>
                                    Select Campaign
                                </Label>
                                <Col sm={9}>
                                    
                                        <Input type="select" onChange={this.handleChange}
                                            name="select"
                                            id="defaultSelect"
                                        >
                                            <option defaultValue="">Select Campaign</option>
                                            {this.state.campaigns.map(camp => (
                                            <option value={camp.id}>{camp.name}</option>))}
                                        </Input>
                                    
                                </Col>
                            </FormGroup>
                        </Form>
                    <Button color='primary' onClick={() => { this.onSubmit() }} className="ml-auto px-4">
                        Submit
                    </Button>
                </Container>
            );
        } else {
            return(
                <p>Loading</p>
            )
        }
        
    }
}