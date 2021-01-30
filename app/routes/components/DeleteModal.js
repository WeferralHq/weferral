import React from "react";
import { 
    Button,
    UncontrolledModal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../../components';
import Fetcher from '../../utilities/fetcher.js';
import port from '../../port';

class DeleteModal extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        let rows = this.props.rows;
        this.state = {
        };
        this.deleteHook = this.deleteHook.bind(this);
    }

    deleteHook() {
        let self = this;
        Fetcher(port + '/api/v1/webhooks/' + self.props.id, "DELETE").then(function (response) {
            if (!response.error) {
                self.fetchData();
            }
        });

    }

    render(){
        let hook = this.props;
        return(
            <React.Fragment>
                <Button id="webhookDelete" color={hook.color} outline={hook.outline} size={hook.size}><i className={hook.icon}></i>{this.props.text}</Button>
                <UncontrolledModal target="webhookDelete">
                    <ModalBody>
                        <h6>Are you sure you want to do this.</h6>
                        <Button color="primary" size="md" onClick={() => { this.deleteHook() }}>Delete</Button>
                    </ModalBody>
                    <ModalFooter>
                        <UncontrolledModal.Close color="link" className="text-primary">
                            Close
                        </UncontrolledModal.Close>
                    </ModalFooter>
                </UncontrolledModal>
            </React.Fragment>
        )
    }
}

export default DeleteModal;