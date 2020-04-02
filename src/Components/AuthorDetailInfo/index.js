import React, { useState } from 'react';
import { Card, Avatar, Descriptions, List } from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';
import './index.css';
import AuthorMap from '../AuthorMap';

const { Meta } = Card;

const AuthorInfo = (props) => {

    const [cover, setCover] = useState({ visibility: 'hidden' });
    const [scale, setScale] = useState({ transform: 'scale(0)' });

    return (
        <>
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Card style={{ width: '40vw' }} bordered={false}>
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
                    <div className='auMap' onClick={e => {
                        //实现不太好，待改进
                        const height = getComputedStyle(document.getElementById('root')).height;
                        setCover({
                            visibility: '',
                            height,
                            backgroundColor: 'rgba(0, 0, 0, 0.35)'
                        });
                        setScale({ transform: 'scale(1)' })
                    }}
                    >
                        <img src="https://www.acemap.info/attachment/default/map.png" alt="" />
                    </div>
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
            </div>
            <div style={cover} className='cover'>
                <AuthorMap setCover={setCover} scale={scale} setScale={setScale}></AuthorMap>
            </div>
        </>

    )
}

export default AuthorInfo;