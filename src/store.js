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
                { term: 'Java', count: 0 },
                { term: 'Software', count: 0 },
                { term: 'Testing', count: 0 },
                { term: 'Programing tesing', count: 0 },
                { term: 'Software engineering', count: 0 }
            ],
            loading: false
        }
    }
    , compose(applyMiddleware(thunk)));