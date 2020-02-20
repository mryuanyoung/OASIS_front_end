import React, { useContext } from 'react';
import { Input, Select } from 'antd';
import { search, changeSeaMet } from './action';
import { connect } from 'react-redux';
import { HistoryContext } from '../../HomePage/index';
import './index.css';

const { Search } = Input;
const {Option} = Select;

const SearchBar = function (props) {

    const directTo = useContext(HistoryContext)

    function toSearch(value) {
        if(value){
            props.searchPaper(value);
            directTo('./paper')
        }
    }

    return (
        <div className='searCont'>
            <Select defaultValue='title' className='select' onChange={props.changeMethod}>
                <Option value='title'>title</Option>
                <Option value='author'>author</Option>
                <Option value='conference'>conference</Option>
            </Select>
            <Search enterButton className='search' onSearch={toSearch}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchPaper: (keyword) => {
            dispatch(search(keyword));
        },
        changeMethod: (method) => {
            dispatch(changeSeaMet(method));
        }
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SearchBar));