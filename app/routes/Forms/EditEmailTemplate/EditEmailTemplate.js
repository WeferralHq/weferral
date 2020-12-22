import React from 'react';
import { 
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

class NotificationTemplateForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            template : {},
            url : "/api/v1/notification-templates/" + props.params.id
        };

        this.handleResponse = this.handleResponse.bind(this);
        this.insertString = this.insertString.bind(this);
    }

    componentDidMount() {
        let self = this;
        Fetcher(self.state.url).then(function(response){
            if(!response.error){

                console.log(response);
                self.setState({template : response});
            }
        });
    }

    handleResponse(response) {}

    humanString(text){
        return(text.replace(/_/g, ' '));
    }

    render() {
        let pageName = this.state.template.data.name || this.props.route.name;
        let template = this.state.template;
        let references = template.schema.references;

        return(
            <React.Fragment>
                <Container>
                    <HeaderMain
                        title="Forms"
                        className="mb-5 mt-4"
                    />
                    { /* START Header 1 */}
                    <Row>
                        <Col lg={12}>
                            <HeaderDemo
                                no={1}
                                title="Basic Inputs"
                                subTitle={(
                                    <React.Fragment>
                                        Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.
                                    </React.Fragment>
                                )}
                            />
                        </Col>
                    </Row>
                    { /* END Header 1 */}
                    { /* START Section 1 */}
                    <Row>
                        <Col lg={12}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6" className="mb-4">
                                        Forms: Inputs
                                <span className="small ml-1 text-muted">
                                            #1.01
                                </span>
                                    </CardTitle>
                                    { /* START Form */}
                                    <Form>
                                        <FormGroup>
                                            <CustomInput
                                                type="checkbox"
                                                id="send_email"
                                                label="Publish"
                                                inline
                                            //defaultChecked
                                            />
                                            <CustomInput
                                                type="checkbox"
                                                id="send_admin"
                                                label="Send To Admin"
                                                inline
                                            />
                                        </FormGroup>
                                        { /* START Input */}
                                        <FormGroup row>
                                            <Label for="input" sm={3}>
                                                Input
                                            </Label>
                                            <Col sm={9}>
                                                <Input
                                                    name="subject"
                                                    plaintext
                                                    initialValue="static@text.com"
                                                    id="input"
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
                                                    name="text"
                                                    id="recipients"
                                                />
                                            </Col>
                                        </FormGroup>
                                        { /* END Input */}
                                    </Form>


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    { /* END Section 1 */}
                </Container>
            </React.Fragment>
        )
    }
}

export default NotificationTemplateForm