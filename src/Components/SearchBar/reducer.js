import * as TYPE from './actionTypes';

export default function(state = {}, action){
    switch(action.type){
        case TYPE.CHANGE_RES:
            return {...state, res: action.res};
        case TYPE.CHANGE_MET:
            return {...state, method: action.method};
        case TYPE.CHANGE_KEY:
            return {...state, oldKeyword: action.oldKeyword};
        case TYPE.LOADING:
            return {...state, loading: !state.loading};
        case TYPE.CHANGE_OFFSET:
            return {...state, offset: action.offset};
        case TYPE.TOTAL:
            return {...state, total: action.total};
        case TYPE.OLD_METHOD:
            return {...state, oldMethod: action.oldMethod};
        case TYPE.CURR_PAGE:
            return {...state, page: action.page};
        default:
            return state;
    }
}