import React, { useState, useEffect, useRef } from 'react';
import { Card, Avatar, Descriptions, List } from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuthorMap, getPaperHeat } from '../DetailInfo/action';
import './index.css';
import AuthorMap from '../AuthorMap';

import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';


const { Meta } = Card;


const AuthorInfo = (props) => {

    const [cover, setCover] = useState({ visibility: 'hidden' });
    const [scale, setScale] = useState({ transform: 'scale(0)' });
    const ref = useRef(null);

    const url = props.history.location.pathname.split('/');
    const [id, setId] = useState(url[url.length - 1]);

    useEffect(() => props.getAuthorMap(id), [id]);
    useEffect(() => props.getPaperHeat(id), [id]);

    useEffect(() => {
        const chart = echarts.init(ref.current);
        if (props.heat) {
            chart.setOption({
                color: ['#1da57a'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 0,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: props.heat.map(item => item.year),
                    }
                ],
                yAxis: {show: false},
                barCategoryGap: '0',
                series: [
                    {
                        name: '论文数: ',
                        type: 'bar',
                        barWidth: 20,
                        barCategoryGap: '0',
                        data: props.heat.map(item => item.paperCount),
                        itemStyle:{
                            barBorderRadius: 5
                        }
                    }
                ]
            })
        }
    }, [props.heat]);

    return (
        <>
            <div>
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
                    <div className='paperHeat'>
                        <p>论文热度趋势: </p>
                        <div class='heatBar' ref={ref}></div>
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

const mapStateToProps = ({ detail }) => {
    return {
        heat: detail.heat
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorMap: (id) => {
            dispatch(getAuthorMap(id));
        },
        getPaperHeat: (id) => {
            dispatch(getPaperHeat(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthorInfo));