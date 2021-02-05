import Cookies from 'js-cookie';
import Fetcher from './fetcher';
import port from '../port';

export async function isAdmin(){
    let uid = Cookies.get("uid");
    if(uid){
        await Fetcher(`${port}/api/v1/role/user/${uid}`).then(function (response) {
            if(response.admin){
                return true;
            }else{
                return false;
            }
        });
    } else {
        return false;
    }
}

export async function isParticipant(){
    let pid = Cookies.get("pid");
    if(pid){
        await Fetcher(`${port}/api/v1/participant/${uid}`).then(function (response) {
            if(response.data){
                return true;
            }else{
                return false;
            }
        });
    } else {
        return false;
    }
}

