import React from 'react';
import {Avatar, Descriptions, List} from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';

const AuthorInfo = (props)=>{
    console.log(props);
    return (
        <>
            <div>
                <Avatar shape="square" size="large" style={{float:"left"}}/>
                <Descriptions title="学者信息" column={2}>
                    <Descriptions.Item label="姓名">{props.authorName}</Descriptions.Item>
                    <Descriptions.Item label="所属机构">{props.institutionName}</Descriptions.Item>
                    <Descriptions.Item label="研究方向" span={2}>{props.keyword.join(" | ")}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className='paperList'>
                <List
                    header="相关论文"
                    itemLayout="vertical"
                    size="middle"
                    pagination={{
                        pageSize: 5,
                    }}
                    dataSource={props.papers}
                    renderItem={item => <PaperType {...item} />}
                />
            </div>
        </>



    )
}

export default AuthorInfo;