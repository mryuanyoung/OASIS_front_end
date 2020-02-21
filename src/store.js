import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './Components/SearchBar/reducer';

export default createStore(reducer,
    {
        method: 'title',
        res: [
            { title: '111', description: 'aaaaa', href: 'www.baidu.com', content: '设法瑟瑟发' },
            { title: '222', description: 'aaaaa', href: 'www.baidu.com', content: '设法瑟瑟发' },
            { title: '333', description: 'aaaaa', href: 'www.baidu.com', content: '设法瑟瑟发' },
            { title: '444', description: 'aaaaa', href: 'www.baidu.com', content: '设法瑟瑟发' },
            { title: '555', description: 'aaaaa', href: 'www.baidu.com', content: '设法瑟瑟发' }
        ]
    },
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));