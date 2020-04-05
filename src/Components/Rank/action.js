import * as TYPE from './actionType';
import { getRequest } from '../../utils/ajax';

export const getMap = (type, keyword) => {
    return async function(dispatch, getState){
        const url = `/keyword/${type}/${keyword}`;
        try {
            let response = await getRequest(url);
            response = JSON.parse(response);
            if (response.success && response.content) {
                switch(type){
                    case 'picByIns':
                        dispatch(changeImsMap(response.content.sort((a,b)=>a.count-b.count)));
                        break;
                    case  'picByAuth':
                        dispatch(changeAutMap(response.content.sort((a,b)=>a.count-b.count)));
                        break;
                    case 'picYearly':
                        dispatch(changeHeatMap(response.content));
                        break;
                    default:
                        break;
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}

export const changeImsMap = (ins) => {
    return {
        type: TYPE.INS_GRAPH,
        ins
    };
}

export const changeAutMap = (author) => {
    return {
        type: TYPE.AUT_GRAPH,
        author
    };
}

export const changeHeatMap = (heat) =>{
    return {
        type: TYPE.HEAT_GRAPH,
        heat
    };
}

export const changeKeyword = (keyword) =>{
    return {
        type: TYPE.OLD_KEYWORD,
        keyword
    };
}