import React from 'react';
import { connect } from 'react-redux';
import { Typography, Divider } from 'antd';
import './index.css';

const { Title, Paragraph, Text } = Typography;

const PaperDetail = (props) => {
    return (
        <Typography className='article'>
            <Title level={1} style={{ 'textAlign': 'center' }}>{props.title}</Title>
            <a href={props.pdfLink} target='_blank'>pdf link</a>
            <Divider />
            <Text strong>Author: </Text><Text>{props.authors.join(' | ')}</Text>
            <br /><br />
            <Paragraph><Text strong>Keywords: </Text>{props.auKywds.join(' / ')}</Paragraph>
            <Divider />
            <Paragraph><Text strong>Abstract: </Text>{props.abstraction}</Paragraph>
            <Divider />
            <Text>articleCitationCount: {props.articleCitationCount}</Text>
            <br />
            <Text>referenceCount: {props.referenceCount}</Text>
            <Divider />
            <Title level={3}>{props.pubTitle}</Title>
            <Title level={4}>{props.doi}</Title>
            <span>Start: {props.sPage}</span><span>End: {props.ePage}</span>
        </Typography>
    )
}

const mapStateToProps = ({ detail }) => {
    return {
        pdfLink: detail.link
    }
}

export default connect(mapStateToProps)(PaperDetail);