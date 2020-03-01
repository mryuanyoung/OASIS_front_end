import React from 'react';
import { List} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {search} from '../DetailInfo/action';
// import Highlight from 'react-highlight'

const Bottom = (props) => {
    return (
        <>
            <div>publication Year: {props.publicationYear}</div>
            <div>reference Count: {props.referenceCount}</div>
        </>
    )
}

const clickHandle = (props) => {
    props.searchDetail(props.doi);
    props.history.push(`/paper/detail`)
}

const SimplePaper = (props) => {
    let {title} = props;
    let keyword = props.oldKeyword;
    let newTitle = warpTag(title, keyword, "Highlight");
    return (
        <List.Item key={props.doi} actions={[<Bottom />]} onClick={clickHandle.bind(null, props)}>
            <List.Item.Meta title={newTitle} description={props.author.join(' | ')}/>
        </List.Item>
    )
}

/*替换关键字并且高亮显示，但是没用上*/
function warpTag(content, keyword, tagName) {
    if (content === "No results") {
        return content
    }
    const a = content.toLowerCase();
    const b = keyword.toLowerCase();

    const indexof = a.indexOf(b);
    const c = indexof > -1 ? content.substr(indexof, keyword.length) : '';
    const {val} = `<${tagName} style="color:red;">${c}</${tagName}>`;
    const regS = new RegExp(keyword, 'gi');
    return content.replace(regS, val);
}

const mapStateToProps = ({search}) => {
    return {
        oldKeyword: search.oldKeyword
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchDetail: (keyword) => {
            dispatch(search(keyword));
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SimplePaper));