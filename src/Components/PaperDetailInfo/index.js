import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchAuthors } from '../DetailInfo/action';
import { Typography, Divider } from 'antd';
import './index.css';

const { Title, Paragraph, Text } = Typography;

const Author = (props) => {
    const authors = props.authors;
    const ids = props.ids;

    const handleClick = (id) => {
        const url = `/author/detail/${id}`;
        props.push(url);
    }

    if (ids.length !== 0) {
        return (
            authors.map((author, idx) => <Text className='author' key={author} onClick={handleClick.bind(null, ids[idx])}>{author}</Text>)
        );
    }
    else {
        return (
            authors.map(author => <Text className='author' key={author}>{author}</Text>)
        );
    }
}

const PaperDetail = (props) => {
    props.searchAuthors(props.authors);
    return (
        <div className='page'>
            <Paragraph className='left' style={{lineHight: '2vh'}}>
                <Text strong>Author Keywords: </Text>
                {props.auKywds.join('\n')}
            </Paragraph>
            <Typography className='article'>
                <Title level={1} style={{ 'textAlign': 'center' }}>{props.title}</Title>
                <a href={props.pdfLink} target='_blank' rel='noopener noreferrer' style={{ color: 'blue', marginLeft: '19vw', fontSize: '1.1rem' }}>PDF link</a>
                <br /><br />
                <div className='authors'>
                    <Text strong>Author: </Text><Text><Author authors={props.authors} ids={props.ids} push={props.history.push} /></Text>
                </div>
                <Divider />
                <Paragraph style={{fontSize: '1rem'}}><Text strong>Abstract: </Text>{props.abstraction}</Paragraph>
                <br/>
                <Text><Text strong>Published in:</Text> {props.pubTitle}</Text>
                <br/><br/>
                <Text strong>StartPage: <Text>{props.sPage}</Text></Text><Text style={{marginLeft: '5vw'}}><Text strong>EndPage: </Text><Text>{props.ePage}</Text></Text>
                <Divider />
                <Text><Text strong>DOI: </Text>{props.doi}</Text>
                <Divider />
                <Text strong>Article Citation Count: </Text><Text>{props.articleCitationCount}</Text>
                <Text style={{marginLeft: '5vw'}} strong>Reference Count: </Text><Text>{props.referenceCount}</Text>
            </Typography>
        </div>
    )
}

const mapStateToProps = ({ detail }) => {
    return {
        pdfLink: detail.link,
        ids: detail.ids
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchAuthors: (authors) => {
            dispatch(searchAuthors(authors));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaperDetail));