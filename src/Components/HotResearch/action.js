import * as TYPE from './actionTypes';
import { getRequest } from '../../utils/ajax.js';


export const search = function () {
    return async function (dispatch, getState) {
        let url = '/paper/popular/term';
        try {
            let response = await getRequest(url, () => dispatch(Loading()));
            response = JSON.parse(response);
            if (response.success && response.content) {
                dispatch(changeHot(response.content.slice(0, 10).sort((a,b)=>a.count-b.count)));
            }
        }
        catch(err){
            console.error(err);
        }
    }
}


export const changeHot = (res) => {
    return {
        type: TYPE.CHANGE_HOT,
        res
    }
}

export const Loading = () => {
    return {
        type: TYPE.LOADING
    };
}



