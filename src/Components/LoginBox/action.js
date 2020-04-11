import * as TYPE from './actionTypes';
import { postRequest } from '../../utils/ajax.js';


export const login = function (values) {
    return async function (dispatch, getState) {
        let url = '/user/logIn';
        try {
            let response = await postRequest(url, () => dispatch(Loading()), values);
            response = JSON.parse(response);
            if (response.success && response.content) {
                dispatch(changeUser(values.emailAdderss));
                dispatch(changeLoginState());
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
        let data ={
            username : values.nickname,
            password : values.password,
            emailAddress : values.email
        }
        try {
            let response = await postRequest(url, () => dispatch(Loading()), data);
            response = JSON.parse(response);
            if (response.success && response.content) {
                dispatch(changeUser(values.emailAdderss));
                dispatch(changeLoginState());
                dispatch(changeModal(3));
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