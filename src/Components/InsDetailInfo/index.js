import React from 'react';
import {Card, Avatar, Descriptions, List} from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';

const { Meta } = Card;

const InsInfo = (props)=>{
    return (
        <>
            <div>
                <Descriptions title={props.institutionName}>
                    <Descriptions.Item label="机构中学者" span={2}>{props.authorName.join(" | ")}</Descriptions.Item>
                    <Descriptions.Item label="研究方向" span={2}>{props.keywords.join(" | ")}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className='paperList'>
                <List
                    header="机构发表的论文"
                    itemLayout="vertical"
                    size="middle"
                    pagination={{
                        pageSize: 5,
                    }}
                    dataSource={props.simplePaperVOList}
                    renderItem={item => <PaperType {...item} />}
                />
            </div>
        </>



    )
}

export default InsInfo;