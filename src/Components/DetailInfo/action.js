import * as TYPE from './actionType';
import { getRequest } from '../../utils/ajax.js';

/*搜索详情*/
export const search = function (keywords) {
    return async function (dispatch, getState) {
        //每次请求时，将上一次的请求结果清空，不然会因类型不匹配渲染出错
        //暂时先这样，之后再做缓存，将每一次请求结果缓存下来
        dispatch(changeDetail({}));

        let method = getState().search.method;
        let url = `/${method}/`;

        /*根据查询类型动态调整url*/
        switch(method){
            case 'paper':
                url += `detail?id=${keywords}`;
                break;
            case 'author':
                url += keywords;
                break;
            case 'institution':
                url += `detail?name=${keywords}`;
                break;
        }
        let response = await getRequest(url);
        response = JSON.parse(response);
        if (response.success && response.content){
            dispatch(changeDetail(response.content));
        }
    }
}

export const changeDetail = (detail) => {
    return {
        type: TYPE.CHANGE_DETAIL,
        detail
    };
}