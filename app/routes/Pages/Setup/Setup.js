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
import 'whatwg-fetch';


class setupAdmin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleSubmit(e) {
          e.preventDefault();
          
          const payload = {
              db_host: this.state.db_host,
              db_name: this.state.db_name,
              db_user: this.state.db_user,
              db_password: this.state.db_password,
              db_port: this.state.db_port,
              smtp_host: this.state.smtp_host,
              smtp_password: this.state.smtp_password,
              smtp_port: this.state.smtp_port,
              smtp_user: this.state.smtp_user,
              admin_user: this.state.admin_user,
              admin_password: this.state.admin_password,
              company_address: this.state.company_address,
              company_email:this.state.company_email,
              company_name: this.state.company_name,
              company_phone_number: this.state.company_phone_number,
              cloudinary_name: this.state.cloudinary_name,
              cloudinary_api_key: this.state.cloudinary_api_key,
              cloudinary_api_secret: this.state.cloudinary_api_secret
          }

          //let payload = new FormData(document.getElementById("admin_form"))
        console.log(JSON.stringify(payload));
        let headers = new Headers({
            "Content-Type": "application/json"
        });

        let init = { method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        };
        

        Fetcher(`${port}/setup`, 'POST', payload, init).then((res) => {
            if(res.message === 'setup-initialized'){
                return this.props.history.push("/login");
            }
        }, (error) => {
            console.log(error);
        })
      }

      handleChange(e) {
          let self = this;

          self.setState({[e.target.name]: e.target.value});
      }

    render() {
        return(
            <div>
                <EmptyLayout>
        <EmptyLayout.Section center width={ 480 }>
            { /* START Header */}
            <HeaderAuth 
                title="Setup Admin and Company Account"
            />
            { /* END Header */}
            { /* START Form */}
            
            <Form className="mb-3" id="admin_form">
                <FormGroup>
                    <Label for="db_host">
                        Database Host
                    </Label>
                    <Input type="text" name="db_host" id="db_host" placeholder="Enter a Database Host..." className="bg-white" onChange={this.handleChange} />
                    
                </FormGroup>
                <FormGroup>
                    <Label for="db_user">
                        Database User
                    </Label>
                    <Input type="text" name="db_user" id="db_user" placeholder="Enter a Database User..." className="bg-white" onChange={this.handleChange}  />
                    
                </FormGroup>
                <FormGroup>
                    <Label for="db_name">
                        Database Name
                    </Label>
                    <Input type="text" name="db_name" id="db_name" placeholder="Enter Database Name..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="db_password">
                        Database Password
                    </Label>
                    <Input type="text" name="db_password" id="db_password" placeholder="Enter Database Password..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="db_port">
                        Database Port
                    </Label>
                    <Input type="text" name="db_port" id="db_port" placeholder="Enter Database Port..." className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
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
                    
                </FormGroup>
                <FormGroup>
                    <Label for="cloudinary_name">
                        Cloudinary Name
                    </Label>
                    <Input type="text" name="cloudinary_name" id="cloudinary_name" placeholder="Cloudinary Name" className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="cloudinary_api_key">
                        Cloudinary Api Key
                    </Label>
                    <Input type="text" name="cloudinary_api_key" id="cloudinary_api_key" placeholder="Cloudinary Api Key" className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <FormGroup>
                    <Label for="cloudinary_api_secret">
                        Cloudinary Api Secret
                    </Label>
                    <Input type="text" name="cloudinary_api_secret" id="cloudinary_api_secret" placeholder="Cloudinary Api Secret" className="bg-white" onChange={this.handleChange}/>
                    
                </FormGroup>
                <ThemeConsumer>
                {
                    ({ color }) => (
                        <Button color={ color } block onClick={this.handleSubmit}>
                            Setup Admin Account
                        </Button>
                    )
                }
                </ThemeConsumer>
            </Form>
            { /* END Bottom Links */}
        </EmptyLayout.Section>
    </EmptyLayout>
            </div>
        )
    }
};

export default setupAdmin;