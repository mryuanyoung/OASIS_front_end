import React from 'react';
import { Input, Select } from 'antd';
import {withRouter} from 'react-router-dom';
import { search, changeMethod, changeOldKeyword } from './action';
import {connect} from 'react-redux';
import './searchBar.css';

const {Search} = Input;
const {Option} = Select;

const SearchBar = function (props) {

    function toSearch(keyword) {
        if(keyword){
            props.searchPaper(keyword);
            props.changeOldKeyword(keyword);

            /*不同类型的搜索结果跳转同一个展示页面，选择不同的展示组件*/
            let methodUrl = `/${props.method}`;
            props.history.push(methodUrl)
        }
    }

    return (
        <div className='searCont'>
            <Select defaultValue={props.method} className='select' size='large' onChange={method => props.changeMethod(method)}>
                <Option value='paper'>Paper</Option>
                <Option value='author'>Author</Option>
                <Option value='conference'>Conference</Option>
                <Option value='interest'>Interest</Option>
                <Option value='institution'>Institution</Option>
                <Option value='mix'>Mix</Option>
            </Select>
            <Search enterButton defaultValue={props.oldKeyword} className='search' size='large' onSearch={toSearch}/>
        </div>
    )
}

const mapStateToProps = ({search}) => {
    return {
        method: search.method,
        oldKeyword: search.oldKeyword
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchPaper: (keyword) => {
            dispatch(search(keyword));
        },
        changeMethod: (method) => {
            dispatch(changeMethod(method));
        },
        changeOldKeyword: (oldKeyword) => {
            dispatch(changeOldKeyword(oldKeyword));
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));