import React from 'react';
import { List, Avatar} from 'antd';
import {withRouter} from 'react-router-dom';
import {searchAuthors,  authorLinks, getAuthorMap} from "../DetailInfo/action";
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
        const url = `/author/detail/${props.authorID}`;
        props.changeLink(props.authorID);
        props.getAuthorMap(props.authorID);
        props.history.push(url);
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        searchDetail: (authorId) => {
            dispatch(searchAuthors(authorId));
        },
        changeLink: (link) => {
            dispatch(authorLinks(link));
        },
        getAuthorMap: (id) => {
            dispatch(getAuthorMap(id));
        }
    }
}

export default withRouter(connect(null,mapDispatchToProps)((props) => {
    const institutionName = props.institutionName;
    return (
        <List.Item 
            className='hoverBox'
            key={props.authorID}
            actions={[<Bottom institutionName = {institutionName}/>]}
            onClick={clickHandle.bind(null, props)}>
            <List.Item.Meta
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={props.authorName}
                description={props.keyword.join(' | ')}/>
        </List.Item>
    )
}));