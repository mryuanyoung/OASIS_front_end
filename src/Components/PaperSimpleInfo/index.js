import React from 'react';
import { List } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { search, changeLink} from '../DetailInfo/action';
// import Highlight from 'react-highlight'

const Bottom = (props) => {
    return (
        <>
            <span>publication Year: {props.pyear}</span>
            <span style={{ margin: '30px' }}>reference Count: {props.rcount}</span>
        </>
    )
}

const clickHandle = (props) => {
    const url = `/paper/detail?id=${props.doi}`;
    props.changeLink(props.pdfLink);
    props.history.push(url);
}

const SimplePaper = (props) => {
    let { title } = props;
    let keyword = props.oldKeyword;
    let newTitle = warpTag(title, keyword, "Highlight");
    return (
        <List.Item
            style={{ minHeight: '25vh' }}
            key={props.doi}
            actions={[<Bottom pyear={props.publicationYear} rcount={props.referenceCount} />]}
            onClick={clickHandle.bind(null, props)}
        >
            <List.Item.Meta
                title={newTitle}
                description={props.author.join(' | ')}
                style={{ cursor: 'pointer' }}
            />
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
    const { val } = `<${tagName} style="color:red;">${c}</${tagName}>`;
    const regS = new RegExp(keyword, 'gi');
    return content.replace(regS, val);
}

const mapStateToProps = ({ search }) => {
    return {
        oldKeyword: search.oldKeyword
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchDetail: (keyword, method) => {
            dispatch(search(keyword, method));
        },
        changeLink: (link) => {
            dispatch(changeLink(link));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SimplePaper));