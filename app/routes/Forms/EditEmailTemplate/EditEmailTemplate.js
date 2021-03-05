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
    EmptyLayout,
    FormText
} from './../../../components';
import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';
import { NavLink as Link } from 'react-router-dom';
import EmailEditor from './EmailEditor';
import ReactQuill, {Quill} from 'react-quill';
import {isAdmin} from '../../../utilities/admin';
import Load from '../../../utilities/load';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
        ['blockquote', 'code-block'],                    // blocks
        [{ 'header': 1 }, { 'header': 2 }],              // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // lists
        [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
        [{ 'direction': 'rtl' }],                        // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
        [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
        [{ 'font': [] }],                                // font family
        [{ 'align': [] }],                               // text align
        ['clean'], 
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
        this.quillRef = null;
        this.reactQuillRef = null;
        this.handleResponse = this.handleResponse.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
    }

    async componentDidMount() {
        let self = this;
        //alert(JSON.stringify(self.props));
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        Fetcher(self.state.url).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({template : response, message : response.data.message});
            }
            self.setState({loading:false});
        }).then(function (){
            this.attachQuillRefs();
        })
        
    }

    componentDidUpdate () {
        if(this.state.loading === false){
            this.attachQuillRefs();
        }
        
    }

    handleResponse(response) {}

    attachQuillRefs() {
        // Ensure React-Quill reference is available:
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        // Skip if Quill reference is defined:
        if (this.quillRef != null) return;

        const quillRef = this.reactQuillRef.getEditor();
        if (quillRef != null) this.quillRef = quillRef;
      }

    insertString(html) {
        //alert(html);
        let range = this.quillRef.getSelection();
        let position = range ? range.index : 0;
        this.quillRef.insertText(position, html);
    }

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
            let references = template.schema.references;
            //alert(template.data.name);

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
                                <Row>
                                    <Col lg={12}>
                                        <h6><strong>Data Fields</strong></h6>
                                        <h6 className="help-block">Available data fields, you can insert data fields related to this event ({this.humanString(template.data.name)}) into the body of your notification.</h6>
                                        <h6 className="help-block text-capitalize">{this.humanString(template.data.name)} Fields</h6>
                                        <Row className = "templateList">
                                        
                                            {Object.keys(template.schema).map(field => {
                                                if (field == "references") {
                                                    return Object.keys(references).map(reference => {
                                                        return (
                                                            <Row key={reference} className="referenceList list-group">
                                                                <h6 className="help-block text-capitalize">{this.humanString(reference)} Fields</h6>
                                                                {Object.keys(references[reference]).map(referenceColumn => {
                                                                    return (
                                                                        <Col lg={4} key={referenceColumn} className="column reference-column list-unstyled">
                                                                            <Button color="info" size="sm" outline onClick={() => { this.insertString(`[[references.${reference}.${referenceColumn}]]`) } }>{referenceColumn}</Button>
                                                                        </Col>)
                                                                })}
                                                            </Row>
                                                        )
                                                    })
                                                } else {
                                                    return (
                                                        <div>
                                                            <Col key={field} className="column list-unstyled">
                                                                <Button color="info" size="sm" outline onClick={() => { this.insertString(`[[${field}]]`) } }>{field}</Button>
                                                            </Col>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </Row>
                                    </Col>
                                </Row>
                                <ReactQuill
                                    ref={(el) => { this.reactQuillRef = el }}
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
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }
        
    }
}