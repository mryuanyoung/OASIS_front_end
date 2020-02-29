import React from 'react';
import { List} from 'antd';
import {withRouter, Route} from 'react-router-dom';

const Bottom = (props) => {
    return (
        <>
            <div>publication Year: {props.publicationYear}</div>
            <div>reference Count: {props.referenceCount}</div>
        </>
    )
}

const clickHandle = (props) => {
    props.history.push(`/paper/detail`)
}

export default withRouter((props) => {
    let {title} = props;
    return (
        <List.Item key={props.doi} actions={[<Bottom />]} onClick={clickHandle.bind(null, props)}>
            <List.Item.Meta title={title} description={props.author.join(' | ')}/>
        </List.Item>
    )
});