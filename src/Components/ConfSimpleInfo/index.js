import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { List } from 'antd';

const clickHandle = (props) => {
    const url = `/conference/detail/${props.conferenceId}`;
    props.history.push(url);
}

const Conference = (props) => {
    return (
        <List.Item
            className='hoverBox'
            style={{ minHeight: '25vh' }}
            key={props.conferenceId}
            onClick={clickHandle.bind(null, props)}
        >
            <List.Item.Meta
                title={props.conferenceName}
                description={`paper count: ${props.paperCount}`}
                style={{ cursor: 'pointer' }}
            />
        </List.Item>
    )
}

export default withRouter(connect()(Conference));