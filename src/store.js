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
            method: 'paper',
            res: [],
            oldKeyword: ''
        },
        detail: {}
    }
    , compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));