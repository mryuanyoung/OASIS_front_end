import * as TYPE from './actionTypes';
import { postRequest } from '../../utils/ajax.js';
import { getRequest } from '../../utils/ajax.js';

export const search = function (keywords) {
    const post = ['paper'];
    return async function (dispatch, getState) {
        let method = getState().search.method;
        let url = `/${method}/simple`;
        let request = postRequest;
        if(!post.includes(method)){
            if(method === 'author') url += `/${keywords}`;
            else url += `?keyword=${keywords}`;
            request = getRequest;
        }
        let response = await request(url, { 'content-type': 'application/json' }, JSON.stringify({
            pattern: method[0].toUpperCase() + method.substring(1),
            keywords
        }));
        response = JSON.parse(response);
        if (response.success){
            dispatch(changeRes(response.content));
        }
    }
}

export const changeMethod = (method) => {
    return {
        type: TYPE.CHANGE_MET,
        method
    };
}

export const changeOldKeyword = (oldKeyword) => {
    return {
        type: TYPE.CHANGE_KEY,
        oldKeyword
    };
}

export const changeRes = (res) => {
    return {
        type: TYPE.CHANGE_RES,
        res
    }
}

export const sortRes = (field, order) => {
    return (dispatch, getState) => {
        let { res } = getState();
        res = [...res].sort(order ? (a, b) => a[field] - b[field] : (a, b) => b[field] - a[field]);
        dispatch(changeRes(res));
    }
}

