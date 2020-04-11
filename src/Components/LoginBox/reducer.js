import * as TYPE from './actionTypes';

export default (state={}, action) => {
    switch(action.type){
        case TYPE.CHANGE_USER:
            return {...state, userName: action.res};
        case TYPE.CHANGE_MODAL:
            return {...state, modal: action.res};
        case TYPE.CHANGE_LOGIN_STATE:
            return {...state, loginState: !state.loginState};
        case TYPE.LOADING:
            return {...state, loading: !state.loading};
        default:
            return state;
    }
}