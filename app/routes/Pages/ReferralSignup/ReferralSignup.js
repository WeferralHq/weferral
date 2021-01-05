import React from 'react';
import { Link } from 'react-router-dom';
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';

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
        this.state = {
            system_settings: false,
            loading : true,
            data: {},
            id: false,
            url: `${port}/api/v1/system-setting/${campaignName}`,
            updateUrl: `${port}/api/v1/participant/${campaignName}`
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
          
          const payload = {
              fname: this.state.fname,
              lname: this.state.lname,
              email: this.state.email,
              password: this.state.password
              /*smtp_host: this.state.smtp_host,
              smtp_password: this.state.smtp_password,
              smtp_port: this.state.smtp_port,
              smtp_user: this.state.smtp_user,
              admin_user: this.state.admin_user,
              admin_password: this.state.admin_password,
              company_address: this.state.company_address,
              company_email:this.state.company_email,
              company_name: this.state.company_name,
              company_phone_number: this.state.company_phone_number*/
          }

          //let payload = new FormData(document.getElementById("admin_form"))
        console.log(JSON.stringify(payload));
        

        Fetcher(`${port}/api/v1/participant/${this.state.id}`, 'POST', payload).then((res) => {
            return <link to='/'></link>
        }, (error) => {
            console.log(error);
        })
      }

      handleChange(e) {
          let self = this;

          self.setState({[e.target.name]: e.target.value});
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
                <div>
                    {types.map((type) => {
                        //alert(type);
                        return(
                            <EmptyLayout>
                                <EmptyLayout.Section center width={480}>
                                {group[type].map((group) => {
                                if(group.option === 'campaign_title_form'){
                                    return(
                                        <div className="mb-4">
                                            <h5 className="text-center mb-4">
                                                {group.value}
                                            </h5>
                                        </div>
                                    )
                                }else if(group.option === 'campaign_title_description'){
                                    return(
                                        <div className="mb-4">
                                            <p className="text-center">
                                                {group.value}
                                            </p>
                                        </div>
                                    )
                                }
                            
                            })}
                                </EmptyLayout.Section>
                            </EmptyLayout>
                        )
                    })}
                    <EmptyLayout>
                        <EmptyLayout.Section center width={480}>
                            { /* START Header */}
                            
                            
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
                                <FormGroup>
                                    <Label for="email">
                                        Email Address
                                    </Label>
                                    <Input type="email" name="email" id="email" placeholder="Enter email..." className="bg-white" onChange={this.handleChange} />
                                </FormGroup>
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
                                {/*<FormGroup>
                    <Label for="smtp_host">
                        SMTP Host
                    </Label>
                    <Input type="text" name="smtp_host" id="smtp_host" placeholder="SMTP Host..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="smtp_user">
                        SMTP User
                    </Label>
                    <Input type="text" name="smtp_user" id="smtp_user" placeholder="SMTP User..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="smtp_password">
                        SMTP Password
                    </Label>
                    <Input type="text" name="smtp_password" id="smtp_password" placeholder="SMTP Password..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="smtp_port">
                        SMTP Port
                    </Label>
                    <Input type="text" name="smtp_port" id="smtp_port" placeholder="SMTP Port..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="admin_user">
                        Email Address
                    </Label>
                    <Input type="email" name="admin_user" id="admin_user" placeholder="Enter email..." className="bg-white" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="admin_password">
                        Password
                    </Label>
                    <Input type="password" name="admin_password" id="admin_password" placeholder="Password..." className="bg-white" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="company_name">
                        Company Name
                    </Label>
                    <Input type="text" name="company_name" id="company_name" placeholder="Enter a Company Name..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="company_address">
                        Company Address
                    </Label>
                    <Input type="text" name="company_address" id="company_address" placeholder="Enter a Company Address..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="company_email">
                        Company Email
                    </Label>
                    <Input type="text" name="company_email" id="company_email" placeholder="Enter a Company Email..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="company_phone_number">
                        Company Phone Number
                    </Label>
                    <Input type="text" name="company_phone_number" id="company_phone_number" placeholder="Enter a Company Phone Number..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>*/}
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
                    
                </div>
            )
        }else {
            return(
                <div><p>loading</p></div>
            )
        }
        
    }
};

export default referralSignup;