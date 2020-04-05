import * as TYPE from './actionType';

export default (state ={}, action) => {
    switch(action.type){
        case TYPE.AUT_GRAPH:
            return {...state, author: action.author};
        case TYPE.HEAT_GRAPH:
            return {...state, heat: action.heat};
        case TYPE.INS_GRAPH:
            return {...state, ins: action.ins};
        case TYPE.KEYWORD:
            return {...state, keyword: action.keyword};
        default:
            return state;
    }
}