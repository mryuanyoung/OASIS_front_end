import React from 'react';
import { List} from 'antd';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {search} from "../DetailInfo/action";

const Bottom = (props) => {
    return (
        <>
            <div>机构学者人数: </div>
        </>
    )
}

const simpleIns = (props) => {
    // console.log(props.institutionName);
    return (
        <List.Item 
            className='hoverBox'
            key={props.institutionName}
            onClick={clickHandle.bind(null, props)}>
            <List.Item.Meta title={props.institutionName} description={props.authorNameList.join(" | ")}/>
        </List.Item>
    )
}

const clickHandle = (props) => {
    if(props.institutionName){
        const url = `/institution/detail/${props.institutionId}`;
        
        props.history.push(url);

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchDetail: (keyword, method) => {
            dispatch(search(keyword, method));
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(simpleIns));