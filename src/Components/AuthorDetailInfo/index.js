import React from 'react';
import {Card, Avatar, Descriptions, List} from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';

const { Meta } = Card;

const AuthorInfo = (props)=>{
    return (
        <>
            <div>
                <Card style={{width:'40vw'}} bordered={false}>
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={props.authorName}
                        description={props.institutionName}
                    />
                    <Descriptions title=" ">
                        {/* <Descriptions.Item label="姓名">{props.authorName}</Descriptions.Item>
                        <Descriptions.Item label="所属机构">{props.institutionName}</Descriptions.Item> */}
                        <Descriptions.Item label="研究方向" span={3}>{props.keyword.join(" | ")}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
            <div className='paperList'>
                <List
                    header="相关论文"
                    itemLayout="vertical"
                    size="middle"
                    pagination={{
                        pageSize: 10,
                        hideOnSinglePage: true,
                        onChange: () => document.documentElement.scrollTop = 0
                    }}
                    dataSource={props.papers}
                    renderItem={item => <PaperType {...item} />}
                />
            </div>
        </>



    )
}

export default AuthorInfo;