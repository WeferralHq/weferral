import React from 'react';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';

class SecretKey extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            secretKey: ''
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        let self = this;
        Fetcher(`${port}/api/v1/secret-key/`).then(function(response){
            if(!response.error){
                console.log(response);
                self.setState({secretKey: response, loading: false});
                //console.log(self.state.campaigns);
            }
        });
    }

    render(){
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        }else{
            return(
                <div>
                    <h6>Secret Api Key</h6>
                    <p>{this.state.secretKey}</p>
                </div>
                
            )
        }
    }
}

export default SecretKey;