import * as TYPE from './actionType';

export default (state={}, action) => {
    switch(action.type){
        case TYPE.CHANGE_HOT:
            return {...state, res: action.res};
        case TYPE.LOADING:
            return {...state, loading: !state.loading};
        default:
            return state;
    }
}