import React from 'react';
import { Link } from 'react-router-dom';
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';
import {setUid, setUser, fetchUsers} from "../../../utilities/action";
import {Authorizer, isAuthorized} from "../../../utilities/authorizer";
import {isAdmin} from "../../../utilities/admin";
import Cookies from 'js-cookie';
import update from "immutability-helper";
import {connect} from "react-redux";

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

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form : {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    handleLogin(e){
        e.preventDefault();
        let that = this;

        Fetcher(`${port}/api/v1/auth/session`, "POST", that.state.form).then(function(result){
            if(!result.error) {
                Fetcher(`${port}/api/v1/auth/token`).then(async function(response){
                    if(response){
                        localStorage.setItem("jwtToken", response.token);
                        await fetchUsers(Cookies.get("uid"), (err, user) => (that.props.setUser(user)));

                        //update redux store with the uid
                        that.props.setUid(Cookies.get("uid"));

                        that.props.history.push("/dashboard");
                    }
                })

                //localStorage.setItem("permissions", result.permissions);
            }else{
                console.log("Login error", result.error);
                that.setState({errors: result.error});
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

    /*componentWillUnmount(){
        document.body.classList.remove('login')
    }*/

    async componentDidMount(){
        if(await isAdmin() === false){
            return this.props.history.push("/login");
            //return browserHistory.push("/");
        }

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
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth
                        title="Sign In to Application"
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
                        <FormGroup>
                            <CustomInput type="checkbox" id="rememberPassword" label="Remember Password" inline />
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
                        <Link to="/pages/forgotpassword" className="text-decoration-none">
                            Forgot Password
                        </Link>
                        <Link to="/pages/register" className="ml-auto text-decoration-none">
                            Register
                        </Link>
                    </div>
                    { /* END Bottom Links */}
                    { /* START Footer */}
                    <FooterAuth />
                    { /* END Footer */}
                </EmptyLayout.Section>
            </EmptyLayout>
        )
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        setUid: (uid) => {
            dispatch(setUid(uid))
        },
        setUser: (uid) => {
            dispatch(setUser(uid))
        }
    }
};

export default connect(null, mapDispatchToProps)(Login);
//export default Login;
