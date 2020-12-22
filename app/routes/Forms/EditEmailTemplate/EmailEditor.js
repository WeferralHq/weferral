import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';
import { Button } from './../../../components';

const emailEditorRef = useRef(null);

class EmailTemplateEditor extends React.Component {

    constructor() {
        super();
        
        this.state = {
            id: this.props.id,
            emailJson: {},
            loading: true
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        let self = this;
        emailEditorRef.current.editor.saveDesign((data) =>{
            const { design } = data
            
            Fetcher(`${port}/api/v1/emailbody/${self.state.id}`, 'POST', design).then((res) => {
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
                    <Button onClick={onsubmit}></Button>
                </div>
                <EmailEditor
                    ref={emailEditorRef}
                    saveDesign={}
                />
            </div>
        )
    }

}

export default EmailTemplateEditor;