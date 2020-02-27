import * as TYPE from './actionTypes';
import {postRequest} from '../../utils/ajax.js';
import {getRequest} from '../../utils/ajax.js';

export const search = function(pattern, keywords) {
    switch (pattern) {
        case "Paper":
            return async function(dispatch, getState) {
                let url = '/paper/simple';
                let response = await postRequest(url, {'content-type': 'application/json'},JSON.stringify({
                    pattern,
                    keywords
                }));
                response = JSON.parse(response);
                if(response.success) dispatch(addResult(response.content));
            }
        case "Author":
            return async function(dispatch, getState) {
                let url = '/author/simple/';
                url += keywords;
                let response = await getRequest(url, {'content-type': 'application/json'});
                response = JSON.parse(response);
                if(response.success) dispatch(addResult(response.content));
            }
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