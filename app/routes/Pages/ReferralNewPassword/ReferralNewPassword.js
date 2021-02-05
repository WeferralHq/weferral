import React from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';

export class ReferralNewPassword extends React.Component{

    constructor(props) {
        super(props);
        let pid = this.props.match.params.pid || null;
        let token = this.props.match.params.token || null;
        this.state = {
            resetPassURL: `${port}/api/v1/auth/reset-password/${pid}/${token}`,
            form : {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset(e){
        console.log(e);
        e.preventDefault();
        let that = this;
        Fetcher(this.state.resetPassURL, "POST", that.state.form).then(function(result){
            if(!result.error) {
                console.log(result);
                localStorage.setItem("permissions", result.permissions);
                this.props.history.push("/login");
            }
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const formState = update(this.state, {
            form: {
                [name] : {$set:value}}
        });
        console.log(formState);
        this.setState(formState);
    }

    componentDidMount() {
        Fetcher(this.state.resetPassURL).then(function (response) {
            if(response.isValid){
                console.log('yes..');
            }else{
                return this.props.history.push("/");
            }
        });
    };

    render(){
        return(
            <EmptyLayout>
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth
                        title="Forgot Password"
                    />
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3">
                        <FormGroup>
                            <Label for="password">
                                Enter your new password to reset
                            </Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your new password to reset" className="bg-white" onChange={this.handleInputChange} />
                        </FormGroup>
                        <div className="d-flex">
                            <ThemeConsumer>
                                {
                                    ({ color }) => (
                                        <Button color={color} onClick={this.handleReset} className="align-self-center">
                                            Reset Password
                                        </Button>
                                    )
                                }
                            </ThemeConsumer>
                        </div>
                    </Form>
                    { /* END Form */}
                </EmptyLayout.Section>
            </EmptyLayout>
        )
    }
}