import React from 'react';
import { 
    EmptyLayout,
} from '../../../components';
import Load from '../../../utilities/load';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import {isAdmin} from '../../../utilities/admin';

class SecretKey extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            settings: {}
        };

        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        if (await isAdmin() === false) {
            return this.props.history.push("/login");
        }
        this.fetchData();
    };

    fetchData() {
        let self = this;
        Fetcher(`${port}/api/v1/secret-key/`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({settings: response, loading: false});
                //console.log(self.state.campaigns);
            }
        });
    }

    render(){
        if(this.state.loading){
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }else{
            return(
                <div>
                    <h6>Secret Api Key</h6>
                    <p>{this.state.settings.secretKey}</p>
                    <br/>
                    <h6>Account Id</h6>
                    <p>{this.state.settings.account_id}</p>
                </div>
                
            )
        }
    }
}

export default SecretKey;