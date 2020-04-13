import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import detailReducer from './Components/DetailInfo/reducer';
import barReducer from './Components/SearchBar/reducer';
import hotReducer from './Components/HotResearch/reducer';
import rankReducer from './Components/Rank/reducer';
import userReducer from './Components/LoginBox/reducer';

export default createStore(
    combineReducers({
        search: barReducer,
        detail: detailReducer,
        hot: hotReducer,
        rank: rankReducer,
        user: userReducer
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
            ids: [],
            image: {},
            heat: null
        },
        rank: {
            ins: null,
            author: null,
            heat: null,
            loading: false,
            keyword: ''
        },
        hot: {
            res: [],
            loading: false
        },
        user: {
            res: [],
            userName: '',
            emailAddress: '',
            password: '',
            loginState: false,
            modal: 1,
            errorInfo: false
        }
    }
    // 打包的时候去掉tool    
    ,compose(applyMiddleware(thunk)))
    //, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
    //别删这个    注释掉就好
