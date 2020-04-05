import React from 'react';
import { connect } from 'react-redux';
import { Descriptions, List } from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';
import echarts from 'echarts/lib/echarts';
import pie from 'echarts/lib/chart/pie';
import { getRequest } from '../../utils/ajax';
import './index.css';

class InsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.termRef = React.createRef();
        this.heatRef = React.createRef();
        this.wordImgRef = React.createRef();
        this.termChart = null;
        this.heatChart = null;
        this.wordImgChart = null;
        this.state = { dire: '' };
    }

    async getwordImg(keyword) {
        const wordImgUrl = `/institution/HeatWordImageByYear?institutionId=${this.props.id}&keyword=${keyword}`;
        let wordImg = await getRequest(wordImgUrl);
        wordImg = JSON.parse(wordImg);
        if (wordImg.success && wordImg.content) {
            this.wordImgChart.setOption({
                color: ['#1da57a'],
                title: { text: keyword, bottom: 0, left: '45%', textStyle: { fontWeight: 100 } },
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
                        data: wordImg.content.map(item => item.year),
                    }
                ],
                yAxis: { show: false },
                barGap: '0',
                barCategoryGap: '0',
                barMaxWidth: 20,
                series: [
                    {
                        name: `${keyword}年热度变化: `,
                        type: 'bar',
                        barWidth: 20,
                        barCategoryGap: '0',
                        data: wordImg.content.map(item => item.paperCount),
                        itemStyle: {
                            barBorderRadius: 5
                        }
                    }
                ]
            })
        }
    }

    componentDidMount() {
        this.termChart = echarts.init(this.termRef.current);
        this.heatChart = echarts.init(this.heatRef.current);
        this.wordImgChart = echarts.init(this.wordImgRef.current);

        (async () => {
            const url = `/institution/HeatByYear/${this.props.id}`;
            try {
                let response = await getRequest(url);
                response = JSON.parse(response);
                if (response.success && response.content) {
                    this.heatChart.setOption({
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
                                data: response.content.map(item => item.year),
                            }
                        ],
                        yAxis: { show: false },
                        barGap: '0',
                        barCategoryGap: '0',
                        barMaxWidth: 20,
                        series: [
                            {
                                name: '年热度变化: ',
                                type: 'bar',
                                barWidth: 20,
                                barCategoryGap: '0',
                                data: response.content.map(item => item.paperCount),
                                itemStyle: {
                                    barBorderRadius: 5
                                }
                            }
                        ]
                    });
                }
            }
            catch (err) {
                console.error(err);
            }
        })();

        (async () => {
            const url = `/institution/keywordImage/${this.props.id}`;
            try {
                let response = await getRequest(url);
                response = JSON.parse(response);
                if (response.success && response.content) {
                    this.setState({ dire: response.content[0].keyword });
                    this.termChart.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        radius: [0, '100%'],
                        visualMap: {
                            show: false,
                            min: 80,
                            max: 600,
                            inRange: {
                                colorLightness: [0, 1]
                            }
                        },
                        series: [
                            {
                                name: '研究方向',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: response.content.map(item => ({
                                    value: item.percent,
                                    name: item.keyword
                                })),
                                roseType: 'radius',
                                minShowLabelAngle: 7,
                                itemStyle: {
                                    color: '#1da57a',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },

                                animationType: 'scale',
                                animationEasing: 'elasticOut',
                                animationDelay: function (idx) {
                                    return Math.random() * 200;
                                }
                            }
                        ]
                    });

                    //获取最大的keyword的wordImg
                    await this.getwordImg(response.content[0].keyword);

                    //监听点击扇形区
                    this.termChart.on('click', (e) => {
                        this.setState({dire: e.data.name})
                        this.getwordImg(e.data.name);
                    });
                }
            }
            catch (err) {
                console.error(err);
            }
        })();
    }

    render() {
        return (
            <>
                <div>
                    <Descriptions title={this.props.institutionName}>
                        <Descriptions.Item label="机构中学者" span={2}>{this.props.authorNameList.join(" | ")}</Descriptions.Item>
                        <Descriptions.Item label="研究方向" span={2}>{this.props.keywords.join(" | ")}</Descriptions.Item>
                    </Descriptions>
                    年热度变化:
                    <div className='heatByYear' ref={this.heatRef}></div>
                    <div>
                        研究方向:
                        <div className='keywordImage' ref={this.termRef}></div>
                        <span>{this.state.dire}方向趋势变化:</span>
                        <div className='wordImg' ref={this.wordImgRef}></div>
                    </div>
                </div>
                <div className='paperList'>
                    <List
                        header="机构发表的论文"
                        itemLayout="vertical"
                        size="middle"
                        pagination={{
                            pageSize: 5,
                        }}
                        dataSource={this.props.simplePaperVOList}
                        renderItem={item => <PaperType {...item} />}
                    />
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ detail }) => {
    return {
        id: detail.res.requestId
    }
}

export default connect(mapStateToProps)(InsInfo);