import * as TYPE from './actionType';
import { getRequest } from '../../utils/ajax.js';
import { changeMethod } from '../SearchBar/action';

/*搜索详情*/
export const search = function (keywords, met) {
    return async function (dispatch, getState) {
        //每次请求时，将上一次的请求结果清空，不然会因类型不匹配渲染出错
        //暂时先这样，之后再做缓存，将每一次请求结果缓存下来
        dispatch(changeDetail({}));
        dispatch(Loading());

        //查询详情页，必须传入method，而不能使用全局的method
        //例：从作者详情点进论文详情，全局method为author，而需要的请求参数method为paper
        let method = met || getState().search.method[0];
        let url = `/${method}/detail`;

        /*根据查询类型动态调整url*/
        // eslint-disable-next-line default-case
        switch (method) {
            case 'paper':
                url += `?id=${keywords}`;
                break;
            case 'author':
                url += `/${keywords}`;
                break;
            case 'institution':
                url += `?name=${keywords}`;
                break;
        }
        try {
            let response = await getRequest(url, () => dispatch(Loading()));
            response = JSON.parse(response);
            if (response.success && response.content) {
                //如果请求成功，要将全局method改为结果类型的method，否则会渲染出错
                if(method === 'paper') dispatch(changeMethod([method, 'title']))
                else dispatch(changeMethod([method]));
                dispatch(changeDetail(response.content));
            }
            dispatch(Loading());
        }
        catch(err){
            console.error(err);
        }
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

export const changeLink = (link) => {
    return {
        type: TYPE.CHANGE_LINK,
        link
    };
}