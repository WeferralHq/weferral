import React from 'react';
import { Link } from 'react-router-dom';
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';
import { HeaderSignup } from './SignupHeader';
import Cookies from 'js-cookie';
import update from "immutability-helper";
import Load from '../../../utilities/load';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    UncontrolledAlert,
    ThemeConsumer
} from './../../../components';


class referralSignup extends React.Component{

    constructor(props) {
        super(props);
        let campaignName = this.props.match.params.campaignName || null;
        let token = this.props.match.params.token;
        this.state = {
            system_settings: false,
            loading : true,
            token: token,
            data: {},
            form : {},
            alerts: {},
            invalidpassword: false,
            id: false,
            url: `${port}/api/v1/system-setting/${campaignName}`,
            createUrl: token ? `/api/v1/participant/${campaignName}/register?token=${token}` : `${port}/api/v1/participant/${campaignName}/register`
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

      componentDidMount() {
        let campaignName = this.props.match.params.campaignName || null;
        this.fetchData();
        this.setState({ id: campaignName});
      };

    fetchData() {
        let self = this;
        Fetcher(self.state.url).then(function (response) {
            if (!response.error) {
                self.setState({ loading: false, system_settings: response});
                return response;
            } else {
                console.log("system setting error", response);
                self.setState({ loading: false });
            }
        }).then(function (response){
            Fetcher(`${port}/api/v1/system-setting/brand_logo/${campaignName}`).then(function(response){
                if(response){
                    self.setState({imgUrl: response.brand_logo});
                }
            })
        })
    }
    
      handleSubmit(e) {
          e.preventDefault();
          let self = this;
        
        console.log(JSON.stringify(self.state.form));
        let form = self.state.form;
        if(form.copassword !== form.password){
            self.setState({
                alerts: {
                    color: 'danger',
                    message: 'The password and confirmation password do not match'
                }
            });
        }else{
            delete form.copassword;
            Fetcher(this.state.createUrl, 'POST', form).then((res) => {
                if(!res.error){
                    console.log(JSON.stringify(res));
                    Cookies.set("pid", res.data.id);
                    Cookies.set("cName", res.data.campaignName);
                    const dash = '/my-dashboard';
                    this.props.history.push(dash);
                }else{
                    self.setState({
                        alerts: {
                            color: 'danger',
                            message: 'Some fields are missing'
                        }
                    });
                }
            }, (error) => {
                console.log(error);
            })
        }
    }

    handleChange(e) {
        let self = this;
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const formState = update(self.state, {
            form: {
                [name] : {$set:value}
            }
        });
        console.log(formState);
        self.setState(formState);
    }

    render() {
        if(this.state.loading === false){
            let group = _.groupBy(this.state.system_settings, (setting) => { return setting.type ? setting.type : "other" });
            let types = _.uniq(_.map(this.state.system_settings, (setting) => setting.type));
            console.log(types)
            let colorSettings = _.map(this.state.system_settings, (s) => {
                if (s.data_type == 'color_picker' && s.value != "undefined" && s.value != undefined) {
                    console.log(s);
                    return s.value
                } else {
                    return null
                }
            });
            colorSettings = _.remove(colorSettings, null);
            colorSettings = _.union(colorSettings, ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']);
            console.log("colorSettings", colorSettings);
            
            return (  
                    <EmptyLayout>
                        <EmptyLayout.Section center width={480}>
                        {(this.state.alerts && this.state.alerts.message) &&
                            <UncontrolledAlert color={this.state.alerts.color} >
                                {this.state.alerts.message}
                            </UncontrolledAlert>
                        }
                            { /* START Header */}
                            <HeaderSignup types={types} group={group} logo={this.state.imgUrl}/>
                            {this.state.token &&
                            <div className="mb-4">
                                <h3 className="text-center mb-4">Finish Your Invitation</h3>
                                <p className="text-center mb-4">Please enter your information to finish the invitation</p>
                            </div> 
                            }
                            
                            { /* END Header */}
                            { /* START Form */}

                            <Form className="mb-3" id="admin_form">
                                <FormGroup>
                                    <Label for="fname">
                                        First Name
                                    </Label>
                                    <Input type="text" name="fname" id="fname" placeholder="Enter a First Name..." className="bg-white" onChange={this.handleChange} />

                                </FormGroup>
                                <FormGroup>
                                    <Label for="lname">
                                        Last Name
                                    </Label>
                                    <Input type="text" name="lname" id="lname" placeholder="Enter a Last Name..." className="bg-white" onChange={this.handleChange} />

                                </FormGroup>
                                {!this.state.token &&<FormGroup>
                                    <Label for="email">
                                        Email Address
                                    </Label>
                                    <Input type="email" name="email" id="email" placeholder="Enter email..." className="bg-white" onChange={this.handleChange} />
                                </FormGroup>}
                                <FormGroup>
                                    <Label for="password">
                                        Password
                                    </Label>
                                    <Input type="password" name="password" id="password" placeholder="Enter Password..." className="bg-white" onChange={this.handleChange} />

                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirm_password">
                                        Confirm Password
                                    </Label>
                                    <Input type="password" name="copassword" invalid={this.state.invalidpassword} id="confirm_password" placeholder="Confirm Password" className="bg-white" onChange={this.handleChange} />

                                </FormGroup>
                                
                                <ThemeConsumer>
                                    {
                                        ({ color }) => (
                                            <Button color={color} block onClick={this.handleSubmit}>
                                                Sign Up
                                            </Button>
                                        )
                                    }
                                </ThemeConsumer>
                            </Form>
                            { /* END Bottom Links */}
                        </EmptyLayout.Section>
                    </EmptyLayout>
            )
        }else {
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }
        
    }
};

export default referralSignup;