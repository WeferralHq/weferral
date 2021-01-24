import Cookies from 'js-cookie';
import Fetcher from './fetcher';
import port from '../port';

export function isAdmin(){
    let uid = Cookies.get("uid");
    if(uid){
        Fetcher(`${port}/api/v1/role/user/${uid}`).then(function (response) {
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

