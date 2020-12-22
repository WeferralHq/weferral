import React from 'react';
import ReactQuill from 'react-quill';
import faker from 'faker/locale/en_US';

import { 
    Container,
    Row,
    Col,
    Input,
    Card,
    Label,
    FormGroup,
    Form
} from '../../../components';
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';

import { HeaderMain } from "../../components/HeaderMain";
const text= `
            <p>${ faker.lorem.paragraph() }</p>
            <br/>
            <p>${ faker.lorem.paragraph() }</p>
            <br/>
            <p>${ faker.lorem.paragraph() }</p>
        `;
export class CampaignPageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            campaigns : [],
            text: text,
            url : `${port}/api/v1/campaigns/`
        };

        this.handleResponse = this.handleResponse.bind(this);
        this.insertString = this.insertString.bind(this);
    }

    componentDidMount() {
        let self = this;
        Fetcher(self.state.url).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({campaigns : response});
            }
        });
    }

    handleChange(e) {
        let id = e.target.id;
        let self = this;
        Fetcher(`${port}/api/v1/campaign/${id}`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({campaign : response});
            }
        });
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['clean']
        ],
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent'
    ]

    _handleChange = (text) => {
        this.setState({ text })
    }

    render() {
        return (
            <Container>
                <HeaderMain 
                    title="Editor"
                    className="mb-5 mt-4"
                />
                <p>
                    <strong>Quill</strong> is a modern rich text editor built for compatibility and extensibility.
                </p>
                <Card>
                    <Form>
                        <FormGroup>
                            <Label for="defaultSelect" sm={3}>
                                Select Campaign
                            </Label>
                            <Col sm={9}>
                                {this.state.campaigns.map(camp => (
                                    <Input
                                        type="select"
                                        onChange={this.handleChange}
                                        name="select"
                                        id="defaultSelect"
                                    >
                                        <option defaultValue="">Select Campaign</option>
                                        <option id={camp.data.id}>{camp.data.name}</option>
                                    </Input>
                                ))}
                            </Col>
                        </FormGroup>
                    </Form>
                    {this.state.campaign.id !== 0 && <ReactQuill
                        value={ this.state.text }
                        onChange={ this._handleChange }
                        modules={ this.modules }
                        formats={ this.formats }
                        style={{
                            minHeight: '300px'
                        }}
                    />}
                </Card>
            </Container>
        );
    }
}