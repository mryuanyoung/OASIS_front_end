import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import detailReducer from './Components/DetailInfo/reducer';
import barReducer from './Components/SearchBar/reducer';

export default createStore(
    combineReducers({
        search: barReducer,
        detail: detailReducer
    }),
    {   
        search: {
            method: ['paper', 'paper'],
            res: [],
            oldKeyword: '',
            loading: false
        },
        detail: {
            res: {},
            loading: false
        }
    }
    , compose(applyMiddleware(thunk)));