import Cookies from 'js-cookie';
import Fetcher from './fetcher';
import port from '../port';

let isAdmin = async function(){
    let result = false;
    let uid = Cookies.get("uid");
    if(uid){
        await Fetcher(`${port}/api/v1/role/user/${uid}`).then(function (response) {
            if(response.admin){
                result = true;
            }else{
                result = false;
            }
        });
    } else {
        result = false;
    }
    return result;
}

let checkEnv = async function(){
    let result = false;
    await Fetcher(`${port}/api/v1/check/env/`).then(response => {
        if (response.env) {
            result = true;
        } else {
            result = false;
        }
    }).catch(err => {
        console.log(err);
    })
    return result;
}

let isParticipant = async function(){
    let result = false;
    let pid = Cookies.get("pid");
    if(pid){
        await Fetcher(`${port}/api/v1/participant/${pid}`).then(function (response) {
            if(response.data){
                result = true;
            }else{
                result = false;
            }
        });
    } else {
        result = false;
    }
    return result;
}

export {isAdmin, checkEnv, isParticipant};

