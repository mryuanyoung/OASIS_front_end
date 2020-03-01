import * as TYPE from './actionTypes';
import { postRequest } from '../../utils/ajax.js';
import { getRequest } from '../../utils/ajax.js';


//请求有待改进，太混乱了
export const search = function (keywords) {
    const post = ['paper'];
    return async function (dispatch, getState) {
        //每次请求时，将上一次的请求结果清空，不然会因类型不匹配渲染出错
        //暂时先这样，之后再做缓存，将每一次请求结果缓存下来
        dispatch(changeRes([]));
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
        if (response.success && response.content){
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

