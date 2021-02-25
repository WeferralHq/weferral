import Alert from 'react-s-alert';
import 'whatwg-fetch';

let Fetcher = function(path, method="GET", body, init=null){
    if(!init){
        let headers = new Headers({
            "Content-Type": "application/json"
        });
        if( localStorage.getItem("jwtToken")) {
            let token = localStorage.getItem("jwtToken");
            headers.append("Authorization", `JWT ${token}`);
        }
        if( localStorage.getItem("bearerToken")) {
            let token = localStorage.getItem("bearerToken");
            headers.append("Authorization", `Bearer ${token}`);
        }

        init = { method: method,
            headers: headers,
            credentials: "include"
        };

        if(method == "POST" || method=="PUT"){
            init.body = JSON.stringify(body)
        }
        // console.log(init);

    }

    return fetch(path, init)
        .then(function(response){
            // console.log("HELLO! " , response);
            if(response.status == 404){
                throw response;
            }
            return response.json();
        })
        .then(function(response){
            if(response != null){
                if(response.error){
                    Alert.error(response.error);
                }
                if(response.message){
                    Alert.info(response.message);

                }
            }
            return response;
        });
};
export default Fetcher;