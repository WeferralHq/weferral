import React from 'react';
import ReactQuill from 'react-quill';
import faker from 'faker/locale/en_US';

import { 
    EmptyLayout,
    Button,
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
import {isAdmin} from '../../../utilities/admin';
import Load from '../../../utilities/load';

import { HeaderMain } from "../../components/HeaderMain";
const text= `
            <p>${ faker.lorem.paragraph() }</p>
            <br/>
            <p>${ faker.lorem.paragraph() }</p>
            <br/>
            <p>${ faker.lorem.paragraph() }</p>
        `;
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
export class CampaignPageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            campaigns : [],
            text: '',
            id: 0,
            url : `${port}/api/v1/campaigns/`
        };

        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        this.fetchData();
    };

    fetchData() {
        let self = this;
        alert('this');
        Fetcher(`${port}/api/v1/campaigns/`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({campaigns: response, loading: false});
                //console.log(self.state.campaigns);
            }
        });
    }

    handleChange(e) {
        let value = e.target.value;
        let self = this;
        self.setState({id: value});
        Fetcher(`${port}/api/v1/campaign/${value}`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({text: response.data.description});
            }
        });
    }

    onSubmit() {
        let self = this;
        let payload = {description: self.state.text}
        Fetcher(`${port}/api/v1/campaign-page/${self.state.id}`, 'POST', payload).then(function(response){
            if(!response.error){
                console.log('SUCCESS');
            }
        });
    }

    _handleChange(tar) {
        let self = this;
        //alert(tar);
        self.setState({ text: tar });
    }

    render() {
        if(this.state.loading === false){
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
                                <Label for="defaultSelect" sm={3}>Select Campaign</Label>
                                <Col sm={9}>
                                        <Input type="select" onChange={this.handleChange} name="select" id="defaultSelect">
                                            <option defaultValue="">Select Campaign</option>
                                            {this.state.campaigns.map(camp => (
                                            <option value={camp.id}>{camp.name}</option>))}
                                        </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                        <ReactQuill
                            value={ this.state.text }
                            onChange={ this._handleChange }
                            modules={ modules }
                            formats={ formats }
                            style={{
                                minHeight: '300px'
                            }}
                        />
                    </Card>
                    <Button color='primary' onClick={() => { this.onSubmit() }} className="ml-auto px-4">
                        Submit
                    </Button>
                </Container>
            );
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