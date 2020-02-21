import * as TYPE from './actionTypes';

export default function(state = {}, action){
    switch(action.type){
        case TYPE.ADD_RES:
            return {...state, res: action.res};
        case TYPE.CHANGE_RES:
            return {...state, res: action.res}
        default:
            return state;
    }
}