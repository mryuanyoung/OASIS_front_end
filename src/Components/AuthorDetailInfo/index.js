import React from 'react';
import { Card, Avatar, Descriptions, List } from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';
import { connect } from 'react-redux';
import { getAuthorMap, getPaperHeat, changeRequestId } from '../DetailInfo/action';
import './index.css';
import AuthorMap from '../AuthorMap';

import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';


const { Meta } = Card;

class AuthorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();

        this.chart = null;

        this.state = {
            cover: { visibility: 'hidden' },
            scale: { transform: 'scale(0)' },
        }
    }

    componentDidMount() {
        this.props.getAuthorMap(this.props.id);
        this.props.getPaperHeat(this.props.id);
        this.chart = echarts.init(this.ref.current);
    }

    componentDidUpdate() {
        if (this.props.heat) {
            this.chart.setOption({
                color: ['#1da57a'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 0,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.props.heat.map(item => item.year),
                    }
                ],
                yAxis: { show: false },
                barCategoryGap: '0',
                series: [
                    {
                        name: '论文数: ',
                        type: 'bar',
                        barWidth: 20,
                        barCategoryGap: '0',
                        data: this.props.heat.map(item => item.paperCount),
                        itemStyle: {
                            barBorderRadius: 5
                        }
                    }
                ]
            })
        }
    }

    render() {
        return (
            <>
                <div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Card style={{ width: '40vw' }} bordered={false}>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={this.props.authorName}
                                    description={this.props.institutionName}
                                />
                                <Descriptions title=" ">
                                    {/* <Descriptions.Item label="姓名">{props.authorName}</Descriptions.Item>
                            <Descriptions.Item label="所属机构">{props.institutionName}</Descriptions.Item> */}
                                    <Descriptions.Item label="研究方向" colmun={3}>{this.props.keyword.join(" | ")}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                            <div className='auMap' onClick={e => {
                                //实现不太好，待改进
                                const height = getComputedStyle(document.getElementById('root')).height;
                                this.setState({
                                    cover: {
                                        visibility: '',
                                        height,
                                        backgroundColor: 'rgba(0, 0, 0, 0.35)'
                                    }
                                });
                                this.setState({ scale: { transform: 'scale(1)' } })
                            }}
                            >
                                <img src="https://www.acemap.info/attachment/default/map.png" alt="" />
                            </div>
                        </div>
                        <div className='paperHeat'>
                            <p>论文热度趋势: </p>
                            <div className='heatBar' ref={this.ref}></div>
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
                            dataSource={this.props.papers}
                            renderItem={item => <PaperType {...item} />}
                        />
                    </div>
                </div>
                <div style={this.state.cover} className='cover'>
                    <AuthorMap setCover={(cover) => this.setState({ cover })} scale={this.state.scale} setScale={(scale) => this.setState(scale)}></AuthorMap>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ detail }) => {
    return {
        heat: detail.heat,
        id: detail.requestId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorMap: (id) => {
            dispatch(getAuthorMap(id));
        },
        getPaperHeat: (id) => {
            dispatch(getPaperHeat(id));
        },
        changeRequestId: (id) => {
            dispatch(changeRequestId(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorInfo);