import React, { useContext, useState } from 'react';
import { Input, Select } from 'antd';
import { search } from './action';
import { connect } from 'react-redux';
import { HistoryContext } from '../../HomePage/index';
import './searchBar.css';
import ReactDOM from "react-dom";

const {Search} = Input;
const {Option} = Select;

const SearchBar = function (props) {

    const directTo = useContext(HistoryContext);
    const [method, setMethod] = useState('Paper');

    function toSearch(keyword) {
        if(keyword){
            props.searchPaper(method, keyword);

            /*不同类型的搜索结果跳转同一个展示页面，选择不同的展示组件*/
            let methodUrl = '/Paper';
            directTo(methodUrl)
        }
    }

    return (
        <div className='searCont'>
            <Select defaultValue='Paper' className='select' size='large' onChange={setMethod}>
                <Option value='Paper'>Paper</Option>
                <Option value='Author'>Author</Option>
                <Option value='Conference'>Conference</Option>
                <Option value='Interest'>Interest</Option>
                <Option value='Institution'>Institution</Option>
                <Option value='Mix'>Mix</Option>
            </Select>
            <Search enterButton className='search' size='large' onSearch={toSearch}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchPaper: (method, keyword) => {
            dispatch(search(method, keyword));

        }
    }
}

export default (connect(null, mapDispatchToProps)(SearchBar));