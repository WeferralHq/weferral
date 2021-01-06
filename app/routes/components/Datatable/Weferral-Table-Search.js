import React from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Input
} from '../../../components';

class WeferralTableSearch extends React.Component {

    constructor(props) {

        super(props);
        this.toggleAdvanced = this.toggleAdvanced.bind(this);
    }

    toggleAdvanced() {
        if (this.props.toggleAdvanced) {
            this.props.toggleAdvanced();
        }
    }

    render() {
        return (
            <div>
                <span>
                    <Button color="primary" type="button" onClick={ this.toggleAdvanced }>Advanced Search</Button>
                </span>
            </div>
        );
    }
}

class WeferralSearchField extends React.Component {

    constructor(props) {

        super(props);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);

    }

    // It's necessary to implement getValue
    getValue() {
        return ReactDOM.findDOMNode(this).value;
    }

    // It's necessary to implement setValue
    setValue(value) {
        ReactDOM.findDOMNode(this).value = value;
    }

    render() {
        return (
            <Input
                type='text'
                defaultValue={ this.props.defaultValue }
                placeholder={ this.props.placeholder || "Search"}
                onKeyUp={ this.props.search }
            />
        );
    }

}

export {WeferralTableSearch, WeferralSearchField};