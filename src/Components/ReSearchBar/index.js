import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom'
import { Input, Select } from 'antd';
import { search } from './action';
import { connect } from 'react-redux';
import { HistoryContext } from '../../HomePage/index';
import './reSearchBar.css';
import PprSearchRes from '../PprSearchRes/index.js';

const {Search} = Input;
const {Option} = Select;

const ReSearchBar = function (props) {

    const directTo = useContext(HistoryContext);
    const [method, setMethod] = useState('Paper');/*创建一个初始值为 Paper 的状态变量 method */

    function toSearch(keyword) {
        if(keyword){
            /*若搜索类型改变，选择不同的展示组件重新渲染*/
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