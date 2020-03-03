import React from 'react';
import { Input, Select, Cascader } from 'antd';
import {withRouter} from 'react-router-dom';
import { search, changeMethod, changeOldKeyword } from './action';
import {connect} from 'react-redux';
import './searchBar.css';

const {Search} = Input;
const {Option} = Select;

const options = [
    {value: '', label:'搜索目标', disabled:true},
    {
        value: 'paper',
        label: 'Paper',
        children: [{value: '', label:'搜索方式', disabled:true},{value:'title',label: 'Title'}, {value: 'author',label: 'Author'},{value: 'conference',label: 'Conference'},{value: 'interest',label: 'Interest'},{value: 'mix',label: 'Mix'},{value: 'year',label: 'Year'}]
    },
    {value: 'author', label: 'Author'},
    {value: 'conference', label: 'Conference'},
    {value: 'institution', label: 'Institution'}
];

const SearchBar = function (props) {

    function toSearch(keyword) {
        if(keyword){
            props.searchPaper(keyword);
            props.changeOldKeyword(keyword);

            /*不同类型的搜索结果跳转同一个展示页面，选择不同的展示组件*/
            let methodUrl = `/${props.method[0]}`;
            props.history.push(methodUrl)
        }
    }

    return (
        <div className='searCont'>
            <Cascader className='cascader' options={options} size='large' placeholder='' defaultValue={props.method} onChange={method => props.changeMethod(method)}></Cascader>
            <Search enterButton defaultValue={props.oldKeyword} className='search' size='large' onSearch={toSearch}/>
        </div>
    );
    // return (
    //     <div className='searCont'>
    //         <Select defaultValue={props.method} className='select' size='large' onChange={method => props.changeMethod(method)}>
    //             <Option value='paper'>Paper</Option>
    //             <Option value='author'>Author</Option>
    //             <Option value='conference'>Conference</Option>
    //             <Option value='interest'>Interest</Option>
    //             <Option value='institution'>Institution</Option>
    //             <Option value='mix'>Mix</Option>
    //         </Select>
    //         <Search enterButton defaultValue={props.oldKeyword} className='search' size='large' onSearch={toSearch}/>
    //     </div>
    // )
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