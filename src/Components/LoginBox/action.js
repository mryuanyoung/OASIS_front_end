import * as TYPE from './actionTypes';
import { postRequest, getRequest } from '../../utils/ajax.js';


export const login = function (values) {
    return async function (dispatch, getState) {
        let url = '/user/logIn';
        let headers = {'content-type': 'application/json'}
        try {
            let response = await postRequest(url, () => dispatch(Loading()), headers, values);
            response = JSON.parse(response);
            if (response.success && response.content) {
                dispatch(changeUser(response.content.userName));
                dispatch(changeModal(3));
            }
            else{
                dispatch(changeError(response.message));
            }
        }
        catch(err){
            console.error(err);
        }
    }
}

export const register = function (values) {
    return async function (dispatch, getState) {
        let url = '/user/register';
        let headers = {'content-type': 'application/json'}
        try {
            let response = await postRequest(url, () => dispatch(Loading()), headers, values);
            response = JSON.parse(response);
            if (response.success) {
                dispatch(changeUser(values.username));
                dispatch(changeModal(3));
            }
            else{
                dispatch(changeError(response.message));
            }
        }
        catch(err){
            console.error(err);
        }
    }
}

export const verifyEmail = function (email) {
    return async function (dispatch, getState) {
        let url = 'mail/email?';
        url += `email=${email}`;
        try {
            let response = await getRequest(url, () => dispatch(Loading()));
            response = JSON.parse(response);
            if (response.success && response.content) {

            }
        }
        catch(err){
            console.error(err);
        }
    }
}


export const changeUser = (res) => {
    return {
        type: TYPE.CHANGE_USER,
        res
    }
}

export const changeError = (res) => {
    return {
        type: TYPE.CHANGE_ERROR,
        res
    }
}

export const changeEmail = (res) => {
    return {
        type: TYPE.CHANGE_EMAIL,
        res
    };
}

export const changeLoginState = () => {
    return {
        type: TYPE.CHANGE_LOGIN_STATE
    }
}

export const changeModal = (res) => {
    return {
        type: TYPE.CHANGE_MODAL,
        res
    }
}

export const Loading = () => {
    return {
        type: TYPE.LOADING
    };
}