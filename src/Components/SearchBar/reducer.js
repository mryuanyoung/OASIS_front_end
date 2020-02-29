import * as TYPE from './actionTypes';

export default function(state = {}, action){
    switch(action.type){
        case TYPE.CHANGE_RES:
            return {...state, res: action.res};
        case TYPE.CHANGE_MET:
            return {...state, method: action.method};
        case TYPE.CHANGE_KEY:
            return {...state, oldKeyword: action.oldKeyword};
        default:
            return state;
    }
}