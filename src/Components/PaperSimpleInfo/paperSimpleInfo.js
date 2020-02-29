import React from 'react';
import { List} from 'antd';
import {withRouter} from 'react-router-dom';

const Bottom = (props) => {
    return (
        <>
            <div>publication Year: {props.publicationYear}</div>
            <div>reference Count: {props.referenceCount}</div>
        </>
    )
}

const clickHandle = (props) => {
    if(props.pdfLink){
        props.history.push(`/paper/${props.pdfLink}`)
    }
}

export default withRouter((props) => {
    let {title} = props;
    return (
        <List.Item key={props.doi} actions={[<Bottom />]} onClick={clickHandle.bind(null, props)}>
            <List.Item.Meta title={title} description={props.author.join(' | ')}/>
        </List.Item>
    )
});