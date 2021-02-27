import React from 'react';
import update from 'immutability-helper';
import ReactQuill from 'react-quill';

import { 
    EmptyLayout,
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
import { CustomInput } from 'reactstrap';
import {isAdmin} from '../../../utilities/admin';
import Load from '../../../utilities/load';

let _ = require("lodash");

export class CampaignSettings extends React.Component {

    constructor(props) {
        super(props);
        let id = this.props.match.params.id || null;
        this.state = {
            system_settings: false,
            loading : true,
            campaigns : [],
            text: '',
            id: 0,
            url : `${port}/api/v1/campaign-system-options/${id}`,
            updateUrl: `${port}/api/v1/system-settings/${id}`
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        //this._handleChange = this._handleChange.bind(this);
        this.handleUpdateSettings = this.handleUpdateSettings.bind(this);
    }

    async componentDidMount() {
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        this.fetchData();
    };

    fetchData() {
        let self = this;
        Fetcher(self.state.url).then(function(response){
            if(!response.error){
                console.log("system-settings", response);
                self.setState({loading: false, system_settings: response});
            }else{
                console.log("system setting error", response);
                self.setState({loading: false});
            }
        });
    }

    handleChange(e) {
        let self = this;
        let value = e.currentTarget.value;
        let name = e.currentTarget.name;
        
        const newData = update(self.state,
            {system_settings: {
                    [name]:{value: {$set: value}}
                }
            }
        );
        self.setState(newData);
        //alert(JSON.stringify(self.state.system_settings));
    }

    handleUpdateSettings(){
        let self = this;
        let payload = _.toArray(self.state.system_settings);
        // console.log("payload", payload);
        Fetcher(self.state.updateUrl, 'PUT', payload).then(function(response){
            if(!response.error){
                console.log('success')
                //self.props.onUpdateSettings();
            }else{
                console.log('Problem PUT /api/v1/system-settings');
            }
        });
    }

    render() {
        if(this.state.loading === false){
            let group = _.groupBy(this.state.system_settings, (setting)=>{return setting.type ? setting.type : "other"});
            let types = _.uniq(_.map(this.state.system_settings, (setting) => setting.type));
            let colorSettings = _.map(this.state.system_settings, (s)=> {
                if(s.data_type == 'color_picker' && s.value != "undefined" && s.value != undefined){
                    console.log(s);
                    return s.value
                }else{
                    return null
                }});
            colorSettings = _.remove(colorSettings, null);
            colorSettings = _.union(colorSettings, ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']);
            console.log("colorSettings", colorSettings);
            return (
                <Container>
                    <HeaderMain 
                        title="Settings"
                        className="mb-5 mt-4"
                    />
                        {types.map((type) => {
                            return (
                                <div>
                                    {group[type].map((group) => {
                                        if (group.data_type == 'bool') {
                                            return (
                                                <Form>
                                                    <FormGroup>
                                                        <CustomInput
                                                            type="checkbox"
                                                            onChange={this.handleChange}
                                                            id={group.id}
                                                            name={group.option}
                                                            //checked={group.value}
                                                            label={group.option.replace(/_+/g, ' ')}
                                                            className="mb-3"
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            )
                                        } else if(group.data_type == 'color_picker'){
                                            return (
                                                <div></div>
                                            )
                                        } else {
                                            return (
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="cookie-life">
                                                            {group.option.replace(/_+/g, ' ')}
                                                        </Label>
                                                        <Input type={group.data_type} name={group.option}
                                                               defaultValue={group.value} onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        })}
                    <Button color='primary' onClick={() => { this.handleUpdateSettings() }} className="ml-auto px-4">
                        Submit
                    </Button>
                </Container>
            );
        } else {
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }
        
    }
}