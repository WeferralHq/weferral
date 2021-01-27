import { bind } from 'lodash';
import React from 'react';
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';

export class Logout extends React.Component {

    constructor(props){
        super(props);
        this.logOutUser = this.logOutUser.bind(this);
    }

    componentDidMount(){
        this.logOutUser();
    }

    logOutUser(){
        let self = this;
        localStorage.removeItem("jwtToken");
        Fetcher(`${port}/api/v1/auth/session/clear`).then(function (response) {
            self.props.history.push("/login");
        });
    }

    render(){
        return(
            <div></div>
        )
    }
}