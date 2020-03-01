import * as TYPE from './actionType';

export default (state={}, action) => {
    switch(action.type){
        case TYPE.CHANGE_DETAIL:
            return action.detail;
        default:
            return state;
    }
}