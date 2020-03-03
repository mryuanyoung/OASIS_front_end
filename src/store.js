import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import detailReducer from './Components/DetailInfo/reducer';
import barReducer from './Components/SearchBar/reducer';
import hotReducer from './Components/HotResearch/reducer';

export default createStore(
    combineReducers({
        search: barReducer,
        detail: detailReducer,
        hot:hotReducer
    }),
    {   
        search: {
            method: ['paper', 'title'],
            offset: 0,
            res: [],
            oldKeyword: '',
            loading: false
        },
        detail: {
            res: {},
            loading: false
        },
        hot:{
            res: [
                { term: '巴西', count: 18203 },
                { term: '印尼', count: 23489 },
                { term: '美国', count: 29034 },
                { term: '印度', count: 104970 },
                { term: '中国', count: 131744 }
            ],
            loading: false
        }
    }
    , compose(applyMiddleware(thunk)));