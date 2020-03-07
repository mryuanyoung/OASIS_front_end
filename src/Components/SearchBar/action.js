import * as TYPE from './actionTypes';
import { getRequest } from '../../utils/ajax.js';
import {PAGE_SIZE, RES_COUNT} from '../../const';

export const search = function (keywords) {
    return async function (dispatch, getState) {
        dispatch(Loading());

        const state = getState();

        //请求不同时(method/keyword不同)，将offset请零，total清零，res清零,page清零
        let offset = state.search.offset;
        let reset = false;
        if (state.search.oldKeyword !== keywords || 
            state.search.oldMethod !== state.search.method.join('')) {
            reset = true;
            offset = 0;
            dispatch(changePage(0));
            dispatch(changeRes([]));
            dispatch(changeTotal(0));
            dispatch(changeOffset(0));
        }

        let method = state.search.method;
        let url = `/${method[0]}/simple?`;

        if (method[0] === 'paper') url += `pattern=${method[1][0].toUpperCase() + method[1].substring(1)}&keywords=${keywords}&offset=${offset}`;
        else if (method[0] === 'conference') url = `/conference/keywords=${keywords}`;
        else if (method[0] === 'author') url += `keyword=${keywords}&offset=${offset}`;
        else url += `keyword=${keywords}&offset=${offset}`;

        try {
            let response = await getRequest(url, () => dispatch(Loading()));
            response = JSON.parse(response);
            if (response.success && response.content) {
                let res = response.content.volist;
                let total = response.content.total;
                if(method[0] === 'institution') {
                    res = response.content;
                    total = response.content.length;
                }

                if(reset) dispatch(changeRes(res));
                else dispatch(changeRes([...state.search.res,...res]));
                //修改请求数据的偏移量
                dispatch(changeOffset(offset + 1));
                //改变数据总量
                dispatch(changeTotal(total))
            }
            //设置oldkeywords
            dispatch(changeOldKeyword(keywords));
            //设置oldmethod
            dispatch(changeOldMethod(method.join('')));
            dispatch(Loading());
        }
        catch (err) {
            console.error(err);
        }
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

export const changeOldMethod = (oldMethod) =>{
    return {
        type: TYPE.OLD_METHOD,
        oldMethod
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

export const changeTotal = (total) => {
    return {
        type: TYPE.TOTAL,
        total
    };
}

export const changePage = (page) =>{
    return {
        type: TYPE.CURR_PAGE,
        page
    };
}