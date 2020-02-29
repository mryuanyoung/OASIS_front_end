import React from 'react';
import { List, Avatar} from 'antd';
import {withRouter} from 'react-router-dom';

const Bottom = (props) => {
    return (
        <>
            <div>隶属机构: {props.institutionName}</div>
        </>
    )
}

const clickHandle = (props) => {
    if(props.authorID){
        props.history.push(`/author/${props.authorID}`)
    }
}

export default withRouter((props) => {
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
});