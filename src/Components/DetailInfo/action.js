import * as TYPE from './actionType';
import { getRequest } from '../../utils/ajax.js';

/*搜索详情*/
export const search = function (url, method) {
    return async function (dispatch, getState) {
        //每次请求时，将上一次的请求结果清空，不然会因类型不匹配渲染出错
        //暂时先这样，之后再做缓存，将每一次请求结果缓存下来
        dispatch(changeDetail({}));
        dispatch(Loading());

        //例：从作者详情点进论文详情，全局method为author，而需要的请求参数method为paper

        /*根据查询类型动态调整url*/
        try {
            let response = await getRequest(url, () => dispatch(Loading()));
            response = JSON.parse(response);
            if (response.success && response.content) {
                //如果请求成功，要将结果的method改为结果类型的method，否则会渲染出错
                dispatch(changeResType(method));
                dispatch(changeDetail(response.content));
            }
            dispatch(Loading());
        }
        catch (err) {
            console.error(err);
        }
    }
}

export const changeRequestId = (requestId) =>{
    return {
        type: TYPE.REQUEST_ID,
        requestId
    };
}

export const getAuthorMap = function (id) {
    return async function (dispatch, getState) {
        const url = `/author/image/${id}`;
        try {
            let response = await getRequest(url);
            response = JSON.parse(response);
            //需要判断和当前的authorId是否相同，暂时没解决
            if (response.success && response.content) {
                dispatch(changeAuthorMap(response.content));
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}

export const changeAuthorMap = function (image) {
    return {
        type: TYPE.AUTHOR_MAP,
        image
    }
}

export const getPaperHeat = function(id){
    return async (dispatch, getState) => {
        const url = `/author/paperHeat/${id}`;
        try{
            let response = await getRequest(url);
            //需要判断和当前的authorId是否相同，暂时没解决
            response = JSON.parse(response);
            if(response.success && response.content){
                dispatch(changePaperHeat(response.content));
            }
        }
        catch(err){
            console.error(err);
        }
    }
}

export const changePaperHeat = function(heat){
    return{
        type: TYPE.PAPER_HEAT,
        heat
    };
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

export const changeResType = (resType) => {
    return {
        type: TYPE.CHANGE_RES_TYPE,
        resType
    };
}

export const searchAuthors = (authors) => {
    return async (dispatch, getState) => {
        try {
            let res = await Promise.all(authors.map(name => {
                let url = `/author/simple?keyword=${name}&offset=${0}`;
                return getRequest(url);
            }));
            const links = res.map(response => {
                try {
                    let json = JSON.parse(response);
                    if (json.success && json.content.volist) {
                        return json.content.volist[0].authorID;
                    }
                }
                catch (err) {
                    console.error(err);
                }
            });
            dispatch(authorLinks(links));
        }
        catch (err) {
            console.error(err);
        }
    }
}

export const authorLinks = (ids) => {
    return {
        type: TYPE.AUTHOR_LINKS,
        ids
    };
}
