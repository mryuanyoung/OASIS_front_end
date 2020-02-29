import * as TYPE from './actionTypes';
import { postRequest } from '../../utils/ajax.js';
import { getRequest } from '../../utils/ajax.js';

/*搜索详情*/
export const search = function (keywords) {
    const post = ['author'];
    return async function (dispatch, getState) {
        let method = getState().method;
        let url = `/${method}`;
        let request = getRequest;

        /*根据查询类型动态调整url*/
        if(!post.includes(method)){
            if(method === 'paper') url += `/detail?id=${keywords}`;
        }
        else{
            url += `/${keywords}`;
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

export const changeRes = (res) => {
    return {
        type: TYPE.CHANGE_RES,
        res
    }
}

