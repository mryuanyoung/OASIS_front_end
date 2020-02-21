import * as TYPE from './actionTypes';
import {getRequest} from '../../utils/ajax.js';

export const search = function(method, keyword) {
    return async function(dispatch, getState) {
        // const url = `/paper/simple?keywords=${keyword}&method=${method}`;
        // const response = await getRequest(url);
        // dispatch(addResult(response));
    }
}

export const addResult = (res={}) => {
    return {
        type: TYPE.ADD_RES,
        res
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
        let {res} = getState();
        res = [...res].sort(order ? (a, b) => a[field]- b[field] : (a, b) => b[field] - a[field]);
        dispatch(changeRes(res));
    }
}