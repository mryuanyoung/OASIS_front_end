import React from 'react';
import { List, Avatar} from 'antd';
import {withRouter} from 'react-router-dom';
import {search} from "../DetailInfo/action";
import { connect } from 'react-redux';

const Bottom = (props) => {
    return (
        <>
            <div>隶属机构: {props.institutionName}</div>
        </>
    )
}

const clickHandle = (props) => {
    if(props.authorID){
        props.searchDetail(props.authorID);
        props.history.push(`/author/detail`)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        searchDetail: (keyword) => {
            dispatch(search(keyword));
        }
    }
}

export default withRouter(connect(null,mapDispatchToProps)((props) => {
    return (
        <List.Item key={props.authorID} actions={[<Bottom />]} onClick={clickHandle.bind(null, props)}>
            <List.Item.Meta
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={props.authorName}
                description={props.keyword.join(' | ')}/>
        </List.Item>
    )
}));