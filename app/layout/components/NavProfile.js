import React from 'react';

import { 
    UncontrolledAlert,
    Col,
    Input,
    Card,
    Button,
    CardBody,
    CardFooter,
    CardTitle,
    Label,
    FormGroup,
    Form
} from '../../components';
import update from "immutability-helper";
import Fetcher from '../../utilities/fetcher';
import port from '../../port';
import { store } from "../../store";
import Cookies from 'js-cookie';


export default class NavProfile  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            user: {}
        };
        /*store.subscribe(() => {
            console.log(store.getState());
            this.setState({user: store.getState().user
            })
        })*/
        this.handleChange = this.handleChange.bind(this);
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
        self.setState(formState);
    }
    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        let uid = Cookies.get('uid');
      let form = self.state.form;
      if(form.copassword !== form.password){
          self.setState({
              alerts: {
                  color: 'danger',
                  message: 'The password and confirmation password do not match'
              }
          });
      }else{
          Fetcher(`${port}/api/v1/users/${uid}`, 'PUT', form).then((res) => {
              if(!res.error){
                  console.log(JSON.stringify(res));
                  const dash = '/dashboard';
                  this.props.history.push(dash);
              }else{
                  self.setState({
                      alerts: {
                          color: 'danger',
                          message: res.message
                      }
                  });
              }
          }, (error) => {
              console.log(error);
          })
      }
  }

    render(){
        const state = store.getState();
        let user = state.user;
        console.log(state);
        return(
            <React.Fragment>
                {(this.state.alerts && this.state.alerts.message) &&
                            <UncontrolledAlert color={this.state.alerts.color} >
                                {this.state.alerts.message}
                            </UncontrolledAlert>
                        }
                <Card>
                        <CardBody>
                            <div className="d-flex mb-4">
                               <CardTitle tag="h6">
                                    Profile Edit
                               </CardTitle>
                            </div>
                            <Form>
                                <FormGroup row>
                                    <Label for="name" sm={3} className="text-right">
                                        Name
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="text" name="name" defaultValue={user.name} onChange={this.handleChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="email" sm={3} className="text-right">
                                        Email
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="email" name="email" defaultValue={user.email} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="password" sm={3} className="text-right">
                                        Password
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="password" name="password" onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="copassword" sm={3} className="text-right">
                                        Confirm Password
                                    </Label>
                                    <Col sm={8}>
                                        <Input type="password" name="copassword" onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button color="primary" onClick={this.handleSubmit}>
                                Update Profile
                            </Button>
                        </CardFooter>
                    </Card>
            </React.Fragment>
        )
    }
}