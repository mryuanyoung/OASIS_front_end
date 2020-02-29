import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './Components/SearchBar/reducer';

export default createStore(reducer,
    {
        method: 'paper',
        res: [],
        oldKeyword: ''
    },
    compose(applyMiddleware(thunk)));