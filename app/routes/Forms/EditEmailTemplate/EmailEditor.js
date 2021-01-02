import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';
import { Button } from './../../../components';

class EmailTemplateEditor extends React.Component {

    constructor(props) {
        super(props);
        this.emailEditorRef = React.createRef();
        this.state = {
            id: this.props.id,
            emailJson: {},
            loading: true
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        let self = this;
        self.emailEditorRef.current.editor.saveDesign((data) =>{
            const { design } = data;
            console.log(JSON.stringify(data));
            const payload = {message: design};
            
            Fetcher(`${port}/api/v1/emailbody/${self.state.id}`, 'POST', payload).then((res) => {
                if (!res.err) {
                    self.setState({ emailJson: res });
                }
                self.setState({ loading: false });
            });
        })
    }

    render() {
        return(
            <div>
                <div>
                    <Button onClick={this.onSubmit}>Save Design</Button>
                </div>
                <EmailEditor
                    ref={this.emailEditorRef}
                />
            </div>
        )
    }

}

export default EmailTemplateEditor;