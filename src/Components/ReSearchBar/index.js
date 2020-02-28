import React, { useContext, useState } from 'react';
import { Input, Select } from 'antd';
import { search } from './action';
import { connect } from 'react-redux';
import { HistoryContext } from '../../HomePage/index';
import './reSearchBar.css';

const {Search} = Input;
const {Option} = Select;

const ReSearchBar = function (props) {

    const directTo = useContext(HistoryContext);
    const [method, setMethod] = useState('Paper');/*创建一个初始值为 Paper 的状态变量 method */

    function toSearch(keyword) {
        if(keyword){
            props.searchPaper(method, keyword);

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