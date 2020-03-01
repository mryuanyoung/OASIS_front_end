import React from 'react';
import { Typography, Divider } from 'antd';
import './index.css';

const { Title, Paragraph, Text } = Typography;

const PaperDetail = (props) => {
    return (
        <Typography className='article'>
            <Title level={1} style={{'textAlign': 'center'}}>{props.title}</Title>
            <Divider />
            <Text strong>Author: {props.authors.join(' | ')}</Text>
            <Paragraph>Keywords: {props.auKywds.join(' / ')}</Paragraph>
            <Divider />
            <Paragraph>Abstract: {props.abstraction}</Paragraph>
            <Divider />
            <Text>articleCitationCount: {props.articleCitationCount}</Text>
            <Text>referenceCount: {props.referenceCount}</Text>
            <Divider />
            <Title level={3}>{props.pubTitle}</Title>
            <Title level={4}>{props.doi}</Title>
            <Text>Start: {props.sPage}</Text><Text> End: {props.ePage}</Text>
        </Typography>
    )
}

export default PaperDetail;