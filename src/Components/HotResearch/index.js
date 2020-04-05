import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Spin } from 'antd';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import tooltip from 'echarts/lib/component/tooltip';
import { search } from './action';
import {changeKeyword} from '../Rank/action';
import './hotSearch.css'


class HotResearch extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.chart = null;
    }

    componentDidMount() {
        this.chart = echarts.init(this.ref.current);
        this.props.searchHot();
    }

    componentDidUpdate() {
        if (this.props.data) {
            this.chart.setOption({
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
                    data: this.props.data.map(item => item.term),
                    nameLocation: 'start'
                }],
                grid: { left: '30%', top: '10%' },
                series: [
                    {
                        name: '论文数: ',
                        type: 'bar',
                        barWidth: 20,
                        barCategoryGap: '0',
                        itemStyle: {
                            barBorderRadius: 5
                        },
                        data: this.props.data.map(item => item.count)
                    }
                ]
            })
            this.chart.on('click', (e) => {
                this.props.changeKeyword(e.name);
                this.props.history.push('/rank');
            })
        }
    }

    render() {
        if (!this.props.loading) {
            return (
                <div className='HotChart' id='chart_container'>
                    <div className="chartTitle">热门关键词</div>
                    <div ref={this.ref} className='chart'></div>
                </div>
            )
        }
        else {
            return <Spin></Spin>;
        }
    }
}

const mapStateToProps = ({ hot }) => {
    return {
        data: hot.res,
        loading: hot.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchHot: () => {
            dispatch(search());
        },
        changeKeyword: (keyword) =>{
            dispatch(changeKeyword(keyword));
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotResearch));

