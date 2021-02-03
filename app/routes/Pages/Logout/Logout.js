import { bind } from 'lodash';
import React from 'react';
import port from '../../../port';
import Fetcher from '../../../utilities/fetcher';
import Cookie from 'js-cookie';

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
        localStorage.removeItem("bearerToken")
        Cookie.remove('uid');
        Cookie.remove('pid');
        Fetcher(`${port}/api/v1/auth/session/clear`).then(function (response) {
            if(response.message === 'successful logout'){
                self.props.history.push("/login");
            }
            
        });
    }

    render(){
        return(
            <div></div>
        )
    }
}