import * as TYPE from './actionType';

export default (state = {}, action) => {
    switch (action.type) {
        case TYPE.CHANGE_DETAIL:
            return { ...state, res: action.res };
        case TYPE.LOADING:
            return { ...state, loading: !state.loading };
        case TYPE.CHANGE_LINK:
            return { ...state, link: action.link };
        case TYPE.CHANGE_RES_TYPE:
            return { ...state, resType: action.resType };
        case TYPE.AUTHOR_LINKS:
            return {...state, ids: action.ids};
        case TYPE.AUTHOR_MAP:
            return {...state, image: action.image};
        default:
            return state;
    }
}