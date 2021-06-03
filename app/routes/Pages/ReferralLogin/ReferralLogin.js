import React from 'react';
import { Link } from 'react-router-dom';
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';
import {setPid, setParticipant, fetchParticipants} from "../../../utilities/action";
import Cookies from 'js-cookie';
import update from "immutability-helper";
import {connect} from "react-redux";

import {
    UncontrolledAlert,
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

class ReferralLogin extends React.Component {

    constructor(props) {
        super(props);
        let campaignName = this.props.match.params.campaignName || null;
        this.state = {
            form : {},
            campaignName: campaignName,
            alerts: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleLogin(e){
        e.preventDefault();
        let that = this;
        let campaignName = that.state.campaignName;

        Fetcher(`${port}/api/v1/participants/login/${campaignName}`, "POST", that.state.form).then(async function(result){
            if(result.status !== 401) {
                localStorage.setItem("bearerToken", result.token);
                Cookies.set("cName", campaignName);
                await fetchParticipants(Cookies.get("pid"), (err, participant) => (that.props.setParticipant(participant)));

                //update redux store with the uid
                that.props.setPid(Cookies.get("pid"));

                that.props.history.push("/my-dashboard");

                //localStorage.setItem("permissions", result.permissions);
            }else{
                console.log("Login error", result.error);
                that.setState({
                    alerts: {
                        color: 'danger',
                        message: result.error
                    }
                });
            }
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const formState = update(this.state, { form: {[name]: {$set: value}}});
        this.setState(formState);
    }

    componentDidMount(){

        if(this.props.email){
            console.log("has email", this.props.email);
            const formState = update(this.state, { form: {email: {$set: this.props.email}}});
            this.setState(formState);
        }

        //document.body.classList.add('login')

    }

    render() {
        return (
            <EmptyLayout>
                {(this.state.alerts && this.state.alerts.message) &&
                    <UncontrolledAlert color={this.state.alerts.color} >
                        {this.state.alerts.message}
                    </UncontrolledAlert>
                }
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth
                        title="Sign In"
                    />
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3">
                        <FormGroup>
                            <Label for="emailAdress">
                                Email Adress
                    </Label>
                            <Input onChange={this.handleInputChange} type="email" name="email" id="email" placeholder="Enter email..." className="bg-white" />
                            <FormText color="muted">
                                We&amp;ll never share your email with anyone else.
                    </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                    </Label>
                            <Input onChange={this.handleInputChange} type="password" name="password" id="password" placeholder="Password..." className="bg-white" />
                        </FormGroup>
                        <ThemeConsumer>
                            {
                                ({ color }) => (
                                    <Button onClick={this.handleLogin} type='submit' color={color} block tag={Link} to="/">
                                        Sign In
                                    </Button>
                                )
                            }
                        </ThemeConsumer>
                    </Form>
                    { /* END Form */}
                    { /* START Bottom Links */}
                    <div className="d-flex mb-5">
                        <Link to={`/${this.state.campaignName}/forgot-password`} className="text-decoration-none">
                            Forgot Password
                        </Link>
                        <Link to={`/${this.state.campaignName}/signup`} className="ml-auto text-decoration-none">
                            Register
                        </Link>
                    </div>
                    { /* END Bottom Links */}
                </EmptyLayout.Section>
            </EmptyLayout>
        )
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        setPid: (pid) => {
            dispatch(setPid(pid))
        },
        setParticipant: (pid) => {
            dispatch(setParticipant(pid))
        }
    }
};

export default connect(null, mapDispatchToProps)(ReferralLogin);
//export default Login;
