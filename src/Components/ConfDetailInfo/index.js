import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '../PaperSimpleInfo';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import { getRequest } from '../../utils/ajax';
import './index.css';

import { List } from 'antd';

class ConfDetail extends React.Component {
    constructor(props) {
        super(props);
        this.paperChart = null;
        this.fieldChart = null
        this.paperRef = React.createRef();
        this.fieldRef = React.createRef();
        this.state = {
            paperHeat: null,
            topField: null,
        }
    }

    componentDidMount() {
        this.paperChart = echarts.init(this.paperRef.current);
        this.fieldChart = echarts.init(this.fieldRef.current);
        (async () => {
            const url = `/conference/paperHeat/${this.props.id}`
            try {
                let response = await getRequest(url);
                response = JSON.parse(response);
                if (response.success && response.content) {
                    this.paperChart.setOption({
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
                        barCategoryGap: '0',
                        series: [
                            {
                                name: '论文数: ',
                                type: 'bar',
                                barWidth: 20,
                                barCategoryGap: '0',
                                data: response.content.map(item => item.paperCount),
                                itemStyle: {
                                    barBorderRadius: 5
                                }
                            }
                        ]
                    })
                }
            }
            catch(err){
                console.error(err);
            }
        })();

        (async () => {
            const url = `/conference/topField/${this.props.id}`;
            try{
                let response = await getRequest(url);
                response = JSON.parse(response);
                if(response.success && response.content){
                    this.fieldChart.setOption({
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
                                data: response.content.termCountVOS.map(item => ({
                                    value: item.count,
                                    name: item.term
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
                    })
                }
            }
            catch(err){
                console.error(err);
            }
        })();
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                <div className='confInfo'>
                    <h1 style={{ margin: '0 auto', width: 'fit-content' }}>{this.props.conferenceName}</h1>
                    年发论文: 
                    <div className='paperHeat' ref={this.paperRef}></div>
                    Top10研究方向: 
                    <div className='topField' ref={this.fieldRef}></div>
                </div>
                <div className='papers'>
                    <List
                        header="会议所属论文"
                        itemLayout="vertical"
                        size="middle"
                        pagination={{
                            pageSize: 10,
                            hideOnSinglePage: true,
                            onChange: () => document.documentElement.scrollTop = 0
                        }}
                        dataSource={this.props.papers}
                        renderItem={item => <Paper {...item} />}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ detail }) => {
    return {
        id: detail.res.requestId
    }
}

export default connect(mapStateToProps)(ConfDetail);