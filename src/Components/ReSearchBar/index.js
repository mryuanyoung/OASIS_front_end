import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom'
import { Input, Select } from 'antd';
import { search } from './action';
import { connect } from 'react-redux';
import { HistoryContext } from '../../HomePage/index';
import './reSearchBar.css';
import SearchRes from '../SearchRes/index.js';

const {Search} = Input;
const {Option} = Select;

const ReSearchBar = function (props) {

    const directTo = useContext(HistoryContext);
    const [method, setMethod] = useState('Paper');

    function toSearch(keyword) {
        if(keyword){
            /*若搜索类型不变，重新渲染搜索结果界面；否则跳转其他类型的搜索结果界面*/
            props.searchPaper(method, keyword);

            const element = (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {new Date().toLocaleTimeString()}.</h2>
                </div>
            );
            ReactDOM.render(element, document.getElementById('container'));
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

export default (connect(null, mapDispatchToProps)(ReSearchBar));