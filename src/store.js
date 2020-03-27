import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import detailReducer from './Components/DetailInfo/reducer';
import barReducer from './Components/SearchBar/reducer';
import hotReducer from './Components/HotResearch/reducer';

export default createStore(
    combineReducers({
        search: barReducer,
        detail: detailReducer,
        hot:hotReducer,
    }),
    {   
        search: {
            method: ['paper', 'title'],
            res: [],
            oldKeyword: '',
            loading: false,
            total: 0,
            oldMethod: '',
            page: 1
        },
        detail: {
            res: {},
            resType: 'paper',
            loading: false,
            ids: []
        },
        hot:{
            res: [],
            loading: false
        }
    }
    //打包的时候去掉tool    
    // ,compose(applyMiddleware(thunk)))
    , compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
    //别删这个    注释掉就好
