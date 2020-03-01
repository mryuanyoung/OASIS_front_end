import * as TYPE from './actionTypes';
import { postRequest } from '../../utils/ajax.js';
import { getRequest } from '../../utils/ajax.js';


//请求有待改进，太混乱了
export const search = function (keywords) {
    return async function (dispatch, getState) {
        //每次请求时，将上一次的请求结果清空，不然会因类型不匹配渲染出错
        //暂时先这样，之后再做缓存，将每一次请求结果缓存下来
        dispatch(changeRes([]));
        dispatch(Loading());
        let method = getState().search.method;
        let url = `/${method[0]}/simple`;
        let response;
        if (method[0] != 'paper') {
            if (method === 'author') url += `/${keywords}`;
            else url += `?keyword=${keywords}`;
            response = await getRequest(url, () => dispatch(Loading()));
        }
        else {
            response = await postRequest(
                url,
                () => dispatch(Loading()),
                { 'content-type': 'application/json' },
                JSON.stringify({
                    pattern: method[1][0].toUpperCase() + method[1].substring(1),
                    keywords
                }));
        }
        response = JSON.parse(response);
        if (response.success && response.content) {
            dispatch(changeRes(response.content));
        }
        dispatch(Loading());
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

export const Loading = () => {
    return {
        type: TYPE.LOADING
    };
}

export const sortRes = (field, order) => {
    return (dispatch, getState) => {
        let { res } = getState();
        res = [...res].sort(order ? (a, b) => a[field] - b[field] : (a, b) => b[field] - a[field]);
        dispatch(changeRes(res));
    }
}

