import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import tooltip from 'echarts/lib/component/tooltip';
import { getMap, changeKeyword } from './action';
import './index.css';

const { Search } = Input;

class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.insRef = React.createRef();
        this.autRef = React.createRef();
        this.heatRef = React.createRef();
        this.insChart = null;
        this.autChart = null;
        this.heatChart = null;
        this.state = {
            keyword: ''
        };
    }

    componentDidMount() {
        this.insChart = echarts.init(this.insRef.current);
        this.props.getMap('picByIns', 'learning (artificial intelligence)');

        this.heatChart = echarts.init(this.heatRef.current);
        this.props.getMap('picYearly', 'learning (artificial intelligence)');

        this.autChart = echarts.init(this.autRef.current);
        this.props.getMap('picByAuth', 'learning (artificial intelligence)');
    }

    componentDidUpdate() {
        this.props.ins && this.insChart.setOption({
            color: ['#1da57a'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: 0
            },
            xAxis: {
                show: false
            },
            yAxis: [{
                type: 'category',
                data: this.props.ins.map(item => item.name)
            }],
            series: [
                {
                    name: '论文数: ',
                    type: 'bar',
                    barWidth: 20,
                    barCategoryGap: '0',
                    itemStyle: {
                        barBorderRadius: 5
                    },
                    data: this.props.ins.map(item => item.count)
                }
            ]
        });

        this.props.heat && this.heatChart.setOption({
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
            ],
            xAxis: [
                {
                    type: 'category',
                    data: this.props.heat.map(item => item.year),
                }
            ]
        })

        this.props.author && this.autChart.setOption({
            color: ['#1da57a'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: 0
            },
            xAxis: {
                show: false
            },
            yAxis: {
                type: 'category',
                data: this.props.author.map(item => item.name)
            },
            series: [
                {
                    name: '论文数: ',
                    type: 'bar',
                    barWidth: 20,
                    barCategoryGap: '0',
                    itemStyle: {
                        barBorderRadius: 5
                    },
                    data: this.props.author.map(item => item.count)
                }
            ]
        });
    }

    Search(keyword) {
        this.props.changeKeyword(keyword);
        this.props.getMap('picByIns', keyword);
        this.props.getMap('picYearly', keyword);
        this.props.getMap('picByAuth', keyword);
    }

    render() {
        return (
            <div className='rankCont'>
                <Search placeholder='请输入研究方向' enterButton size='large' style={{ width: '30vw' }} defaultValue={this.props.oldKeyword} onSearch={this.Search.bind(this)}></Search>
                <h1 style={{ marginTop: '8vh' }}>{this.props.oldKeyword ? this.props.oldKeyword : 'learning (artificial intelligence)'}</h1>
                <div className='insChart' ref={this.insRef}></div>
                <span style={{ marginTop: '-8vh' }}>学术机构排名</span>
                <div className='autChart' ref={this.autRef}></div>
                <span style={{ marginTop: '-8vh' }}>作者排名</span>
                <div className='heatChart' ref={this.heatRef}></div>
                <span style={{ marginTop: '-5vh' }}>热度变化趋势</span>
            </div>
        );
    }
}

const mapStateToProps = ({ rank }) => {
    return {
        ins: rank.ins,
        author: rank.author,
        heat: rank.heat,
        oldKeyword: rank.oldKeyword
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMap: (type, keyword) => {
            dispatch(getMap(type, keyword));
        },
        changeKeyword: (keyword) => {
            dispatch(changeKeyword(keyword));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rank);