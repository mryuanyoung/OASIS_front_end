import * as TYPE from './actionTypes';

export default function(state = {}, action){
    switch(action.type){
        case TYPE.ADD_RES:
            return {...state, res: action.res};
        case TYPE.CHA_SEA_MET:
            return {...state, method: action.method};
        default:
            return state;
    }
}