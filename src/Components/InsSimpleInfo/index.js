import React from 'react';
import { List} from 'antd';
import {withRouter} from 'react-router-dom';

const Bottom = (props) => {
    return (
        <>
            <div>机构学者人数: </div>
        </>
    )
}

const clickHandle = (props) => {
    if(props.institutionName){
        props.history.push(`/institution/${props.institutionName}`)
    }
}

export default withRouter((props) => {
    console.log(props);
    return (
        <List.Item key={props.institutionName} actions={[<Bottom />]} onClick={clickHandle.bind(null, props)}>
            <List.Item.Meta title={props.institutionName} description={props.authors}/>
        </List.Item>
    )
});