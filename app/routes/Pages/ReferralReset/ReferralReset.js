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

export class ReferralReset extends React.Component{

    constructor(props) {
        super(props);
        let campaignName = this.props.match.params.campaignName || null;
        this.state = {
            system_settings: false,
            loading : true,
            data: {},
            campaignName: '',
            url: `${port}/api/v1/system-setting/${campaignName}`,
            resetUrl: `${port}/api/v1/participant/${campaignName}/reset-password`
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let campaignName = this.props.match.params.campaignName || null;
        this.fetchData();
        this.setState({ campaignName: campaignName});
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
            email: this.state.email
        }
        console.log(JSON.stringify(payload));
        Fetcher(this.state.resetUrl, 'POST', payload).then((res) => {
            if (!res.error) {
                console.log(JSON.stringify(res));
                const dash = `${this.state.campaignName}/login`;
                this.props.history.push(dash);
            }
        }, (error) => {
            console.log(error);
        })
    }

    handleChange(e) {
        let self = this;
        self.setState({ [e.target.name]: e.target.value });
    }

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
                            <Label for="emailAdress">
                                Email Adress
                            </Label>
                            <Input type="email" name="email" id="emailAdress" placeholder="Enter..." className="bg-white" onChange={this.handleChange} />
                            <FormText color="muted">
                                We&amp;ll never share your email with anyone else.
                            </FormText>
                        </FormGroup>
                        <div className="d-flex">
                            <ThemeConsumer>
                                {
                                    ({ color }) => (
                                        <Button color={color} onClick={this.handleSubmit} className="align-self-center">
                                            Reset Password
                                        </Button>
                                    )
                                }
                            </ThemeConsumer>
                            <Button color="link" tag={Link} to={`${this.state.campaignName}/login`} className="align-self-center ml-auto pr-0 text-decoration-none">
                                <i className="fa fa-angle-left mr-2"></i> Back to Home
                            </Button>
                        </div>
                    </Form>
                    { /* END Form */}
                    { /* START Bottom Links */}
                    <div className="d-flex mb-5">
                        <Link to={`${this.state.campaignName}/login`} className="text-decoration-none">
                            Login
                        </Link>
                        <Link to={`${this.state.campaignName}/signup`} className="ml-auto text-decoration-none">
                            Signup
                        </Link>
                    </div>
                </EmptyLayout.Section>
            </EmptyLayout>
        )
    }
}