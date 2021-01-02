import React from 'react';
import { 
    Button,
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    FormFeedback,
    Badge,
    CustomInput,
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText
} from './../../../components';
import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';
import { NavLink as Link } from 'react-router-dom';
import EmailEditor from './EmailEditor';
import ReactQuill from 'react-quill';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['clean']
    ],
}
    
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent'
]

export class NotificationTemplateForm extends React.Component {

    constructor(props) {
        super(props);
        //alert(JSON.stringify(this.props));
        let id = this.props.match.params.id || null;
        this.state = {
            loading : true,
            template : {},
            message:'',
            subject:'',
            recipients:'',
            url : `${port}/api/v1/notification-template/${id}`,
            fetchUrl : `${port}/api/v1/email-template/${id}`
        };

        this.handleResponse = this.handleResponse.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.insertString = this.insertString.bind(this);
    }

    componentDidMount() {
        let self = this;
        //alert(JSON.stringify(self.props));
        Fetcher(self.state.url).then(function(response){
            if(!response.error){

                console.log(response);
                self.setState({template : response, message : response.data.message});
            }
            self.setState({loading:false});
        });
    }

    handleResponse(response) {}

    humanString(text){
        return(text.replace(/_/g, ' '));
    }

    handleChange(e) {
        let self = this;
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        self.setState({[name]: value});
    }

    _handleChange(tar) {
        let self = this;
        //alert(tar);
        self.setState({ message: tar });
    }

    onSubmit(e) {
        const payload = {
            send_email: this.state.send_email,
            send_admin: this.state.send_admin,
            message: this.state.message,
            subject: this.state.subject
        }
        Fetcher(this.state.fetchUrl, 'POST', payload).then(function(response){
            if(!response.error){
                console.log('SUCCESS');
            }
        });
    }

    render() {
        if(this.state.loading === false){
            let pageName = this.state.template.data.name || this.props.route.name;
            let template = this.state.template;
            //let references = template.schema.references;

            return (
                <React.Fragment>
                    <Container>
                        <HeaderMain
                            title="Edit Notification Template"
                            className="mb-5 mt-4"
                        />
                        { /* START Section 1 */}
                        <Row>
                            <Col lg={12}>
                                { /* START Form */}
                                <Form>
                                    <FormGroup>
                                        <CustomInput
                                            type="checkbox"
                                            onChange={this.handleChange}
                                            name="send_email"
                                            label="Publish"
                                            inline
                                            checked={template.data.send_email}
                                        />
                                        <CustomInput
                                            type="checkbox"
                                            onChange={this.handleChange}
                                            name="send_admin"
                                            label="Send To Admin"
                                            inline
                                            checked={template.data.send_to_owner}
                                        />
                                    </FormGroup>
                                    { /* START Input */}
                                    <FormGroup row>
                                        <Label for="input" sm={3}>
                                            Subject
                                            </Label>
                                        <Col sm={9}>
                                            <Input
                                                type="text"
                                                onChange={this.handleChange}
                                                name="subject"
                                                //plaintext
                                                defaultValue={template.data.subject}
                                                id="subject"
                                            />
                                        </Col>
                                    </FormGroup>
                                    { /* END Input */}
                                    { /* START Input */}
                                    <FormGroup row>
                                        <Label for="recipients" sm={3}>
                                            Recipients
                                                </Label>
                                        <Col sm={9}>
                                            <Input
                                                type="text"
                                                onChange={this.handleChange}
                                                name="recipients"
                                                id="recipients"
                                            />
                                        </Col>
                                    </FormGroup>
                                    { /* END Input */}
                                </Form>
                                <ReactQuill
                                    value={this.state.message}
                                    onChange={this._handleChange}
                                    modules={modules}
                                    formats={formats}
                                    style={{
                                        minHeight: '300px'
                                    }}
                                />
                                <Button color='primary' onClick={() => { this.onSubmit() }} className="ml-auto px-4">
                                    Submit
                                </Button>


                            </Col>
                        </Row>
                        { /* END Section 1 */}
                    </Container>
                </React.Fragment>
            )
        } else {
            return(
                <p>Loading</p>
            )
        }
        
    }
}