import * as TYPE from './actionType';
import { getRequest } from '../../utils/ajax.js';
import { TimePicker } from 'antd';

/*搜索详情*/
export const search = function (keywords) {
    return async function (dispatch, getState) {
        //每次请求时，将上一次的请求结果清空，不然会因类型不匹配渲染出错
        //暂时先这样，之后再做缓存，将每一次请求结果缓存下来
        dispatch(changeDetail({}));
        dispatch(Loading());

        let method = getState().search.method[0];
        let url = `/${method}/`;

        /*根据查询类型动态调整url*/
        // eslint-disable-next-line default-case
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
        let response = await getRequest(url, () => dispatch(Loading()));
        response = JSON.parse(response);
        if (response.success && response.content){
            dispatch(changeDetail(response.content));
        }
        dispatch(Loading());
    }
}

export const changeDetail = (res) => {
    return {
        type: TYPE.CHANGE_DETAIL,
        res
    };
}

export const Loading = () => {
    return {
        type: TYPE.LOADING
    };
}