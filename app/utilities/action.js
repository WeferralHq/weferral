import Fetcher from './fetcher';
import port from '../port';

/*
 * action types
 */

export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_UID = 'SET_UID';
export const SET_PID = 'SET_PID';
export const SET_USER = "SET_USER";
export const SET_PARTICIPANT = "SET_PARTICIPANT";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const SET_FORM_DATA = "SET_FORM_DATA";
export const INITIALIZE = "INITIALIZE";

/*
 * other constants
 */
export async function fetchUsers(uid = null, callback){
    let user = null;
    if(uid){
        // console.log("redux action setUser", uid);
        Fetcher(`${port}/api/v1/users/own`).then(function (response) {
            // console.log("user response", response);
            if (!response.error && response.length) {
                user = response[0];
                callback(null, user);
            } else {
                callback(response.error)
                // console.log("error fetching own user after login");
            }
        });
    }
    callback("no uid");
}

export async function fetchParticipants(pid = null, callback){
    let participant = null;
    if(pid){
        // console.log("redux action setpParticipant", pid);
        Fetcher(`${port}/api/v1/participants/own`).then(function (response) {
            // console.log("user response", response);
            if (!response.error && response.length) {
                participant = response[0];
                callback(null, participant);
            } else {
                callback(response.error)
                // console.log("error fetching own user after login");
            }
        });
    }
    callback("no pid");
}


/*
 * action creators
 */

export function setOptions(options){
    return { type: SET_OPTIONS, options }
}

export function initializeState(initialState){
    return { type: INITIALIZE, initialState }
}


export function addNotification(notification, isSystem){
    return { type: ADD_NOTIFICATION, notification, isSystem }
}


export function setNotifications(notifications, isSystem){
    return { type: SET_NOTIFICATIONS, notifications, isSystem }
}


export function setUid(uid) {
    return { type: SET_UID, uid }
}

export function setPid(pid) {
    return { type: SET_PID, pid }
}

export function setUser(user) {
    return { type: SET_USER, user }
}

export function setParticipant(participant) {
    return { type: SET_PARTICIPANT, participant }
}

export function setFormData(name, formData){
    return { type: SET_FORM_DATA, name, formData  }
}