import * as TYPE from './actionTypes';
import { postRequest } from '../../utils/ajax.js';
import { getRequest } from '../../utils/ajax.js';


//请求有待改进，太混乱了
export const search = function (keywords) {
    return async function (dispatch, getState) {
        //每次发出不同的请求时，将上一次的请求结果清空，不然会因类型不匹配渲染出错
        //暂时先这样，之后再做缓存，将每一次请求结果缓存下来
        dispatch(changeRes([]));
        
        dispatch(Loading());

        const state = getState();

        //keyword不同时，将offset请零
        let offset = 0;
        if(state.search.oldKeyword !== keywords) dispatch(changeOffset(0));

        let method = state.search.method;
        let url = `/${method[0]}/simple?`;

        if(method[0] === 'paper') url += `pattern=${method[1][0].toUpperCase() + method[1].substring(1)}&keywords=${keywords}&offset=${offset}`;
        else if(method[0] === 'conference') url = `/conference/keywords=${keywords}`;
        else if(method[0] === 'author') url += `keyword=${keywords}&offset=${offset}`;
        else url += `keyword=${keywords}&offset=${offset}`;

        let response = await getRequest(url, () => dispatch(Loading()));
        response = JSON.parse(response);
        if (response.success && response.content) {
            dispatch(changeRes(response.content));
            //修改请求数据的偏移量
            dispatch(changeOffset(response.content.length));
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

export const changeOffset = (offset) => {
    return {
        type: TYPE.CHANGE_OFFSET,
        offset
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

