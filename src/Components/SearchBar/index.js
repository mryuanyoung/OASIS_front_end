import React, { useContext, useState } from 'react';
import { Input, Select } from 'antd';
import { search } from './action';
import { connect } from 'react-redux';
import { HistoryContext } from '../../HomePage/index';
import './searchBar.css';

const { Search } = Input;
const {Option} = Select;

const SearchBar = function (props) {

    const directTo = useContext(HistoryContext)
    const [method, setMethod] = useState('title');

    function toSearch(keyword) {
        if(keyword){
            props.searchPaper(method, keyword);
            directTo('/paper')
        }
    }

    return (
        <div className='searCont'>
            <Select defaultValue='title' className='select' onChange={setMethod}>
                <Option value='title'>title</Option>
                <Option value='author'>author</Option>
                <Option value='conference'>conference</Option>
            </Select>
            <Search enterButton className='search' onSearch={toSearch}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchPaper: (keyword) => {
            dispatch(search(keyword));
        }
    }
}

export default (connect(null, mapDispatchToProps)(SearchBar));