import * as TYPE from './actionType';

export default (state={}, action) => {
    switch(action.type){
        case TYPE.CHANGE_DETAIL:
            return {...state, res: action.res};
        case TYPE.LOADING:
            return {...state, loading: !state.loading};
        case TYPE.CHANGE_LINK:
            return {...state, link: action.link};
        default:
            return state;
    }
}