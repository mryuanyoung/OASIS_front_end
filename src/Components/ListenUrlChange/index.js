import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { search as searchD } from '../DetailInfo/action';
import {search, changeMethod, changeOldKeyword} from '../SearchBar/action';

class Listener extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.props.history.listen(({ pathname, search }) => {
            document.documentElement.scrollTop = 0
            const reg = /\/[^\/]+\/detail/;
            if (reg.test(pathname)) {
                const method = pathname.match(/[^/]+/)[0];
                this.props.matchUrl(pathname + search, method);
            }
        });

        //如果有路由信息，则说明之前有刷新，加载路由路径和之前的搜索信息
        const loca = JSON.parse(window.sessionStorage.getItem('location'));
        if (loca && (loca.pathname !== '/' || loca.search || loca.hash)) {
            this.props.history.push(`${loca.pathname}?${loca.search}#${loca.hash}`);
            const search = JSON.parse(window.sessionStorage.getItem('search'));
            if(search.oldKeyword && search.oldMethod){
                let method;
                if(search.oldMethod[0] === 'p'){
                    method = ['paper', search.oldMethod.substring(5)];
                }
                else{
                    method = [search.oldMethod];
                }
                this.props.changeMethod(method);
                this.props.changeOldKeyword(search.oldKeyword);
                this.props.search(search.oldKeyword);
            }
        }

        //刷新时存路由信息和搜索信息，在跳转到首页(刷新请求才不会404)
        window.addEventListener('beforeunload', (e) => {
            window.sessionStorage.setItem('location', JSON.stringify(this.props.history.location));
            window.sessionStorage.setItem('search', JSON.stringify(this.props.searchInfo))
            // window.history.pushState({}, 'refresh', '/');
            this.props.history.push('/');
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = ({ search }) => {
    return {
        searchInfo: {
            oldKeyword: search.oldKeyword,
            oldMethod: search.oldMethod
        }
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        matchUrl: (url, method) => {
            dispatch(searchD(url, method));
        },
        search: (keyword) => {
            dispatch(search(keyword));
        },
        changeMethod: (method) => {
            dispatch(changeMethod(method));
        },
        changeOldKeyword: (keyword) => {
            dispatch(changeOldKeyword(keyword));
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Listener));