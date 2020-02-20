import * as TYPE from './actionTypes';
import {getRequest} from '../../utils/ajax.js';

export const search = function(keyword) {
    return async function(dispatch, getState) {
        const {method} = getState();
        const url = `/paper/simple?keywords=${keyword}&method=${method}`;
        const response = await getRequest(url);
        dispatch(addResult(response));
    }
}

export const addResult = (res={}) => {
    return {
        type: TYPE.ADD_RES,
        res
    };
}

export const changeSeaMet = (met) => {
    return {
        type: TYPE.CHA_SEA_MET,
        method: met
    };
}