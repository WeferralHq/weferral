import React from 'react';
import { Link } from 'react-router-dom';
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';
import { HeaderSignup } from './SignupHeader';
import Cookies from 'js-cookie';
import update from "immutability-helper";

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";


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
            id: false,
            url: `${port}/api/v1/system-setting/${campaignName}`,
            createUrl: token ? `/api/v1/participant/${id}/register?token=${token}` : `${port}/api/v1/participant/${id}/register`
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
                console.log(response);
                self.setState({ loading: false, system_settings: response});
            } else {
                console.log("system setting error", response);
                self.setState({ loading: false });
            }
        });
    }
    
      handleSubmit(e) {
          e.preventDefault();
          let self = this;
          
          /*const payload = {
              fname: this.state.fname,
              lname: this.state.lname,
              email: this.state.email,
              password: this.state.password
          }*/

          //let payload = new FormData(document.getElementById("admin_form"))
        console.log(JSON.stringify(self.state.form));
        

        Fetcher(this.state.createUrl, 'POST', self.state.form).then((res) => {
            if(!res.error){
                console.log(JSON.stringify(res));
                Cookies.set("pid", res.data.id);
                const dash = '/my-dashboard';
                this.props.history.push(dash);
            }
        }, (error) => {
            console.log(error);
        })
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
                            { /* START Header */}
                            <HeaderSignup types={types} group={group}/>
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
                                    <Input type="text" name="password" id="password" placeholder="Enter Password..." className="bg-white" onChange={this.handleChange} />

                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirm_password">
                                        Confirm Password
                                    </Label>
                                    <Input type="text" name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="bg-white" onChange={this.handleChange} />

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
                            { /* START Footer */}
                            <FooterAuth />
                            { /* END Footer */}
                        </EmptyLayout.Section>
                    </EmptyLayout>
            )
        }else {
            return(
                <div><p>loading</p></div>
            )
        }
        
    }
};

export default referralSignup;