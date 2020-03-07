import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { search} from './action';
import './hotSearch.css'


class HotResearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isSend:false}
    }

    componentDidMount() {
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
        this.props.searchHot();

    }

    render() {

          const cols = {
            term: { alias: '研究方向' },
            count: { alias: '词频数' }
          };

          const termTitle = {
            autoRotate: false, // 是否需要自动旋转，默认为 true
            offset: 30, // 设置标题 title 距离坐标轴线的距离
            textStyle: {
              fontSize: '12'
            }, // 坐标轴文本属性配置
            position: 'end'
          }

          const termLabel = {
            offset: 10, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
            rotate: 0, // 文本旋转角度
            // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
            textStyle: {
              textAlign: 'end', // 文本对齐方向，可取值为： start center end
              fontSize: '12', // 文本大小
              fontWeight: 'bold', // 文本粗细
              textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
            },
            /**
             * 用于格式化坐标轴上显示的文本信息的回调函数
             * @param  {string} text  文本值
             * @param  {object} item  该文本值对应的原始数据记录
             * @param  {number} index 索引值
             * @return {string}       返回格式化后的文本值
             */
            formatter(text, item, index) {
                let arr = text.split(' ');
                if(arr[1]===undefined){
                    return text;
                }
                return `${arr[0]}\n${arr[1]}`;
              },
            autoRotate: false, // 文本是否需要自动旋转，默认为 true
          }          

        if (!this.props.loading) {
            return (
                <div className='HotChart' id='chart_container'>
                    <div className="chartTitle">热门关键词</div>
                    <Chart width={750} height={400} data={this.props.data.slice(0,6)} scale={cols}>
                        <Axis name="count" title/>
                        <Axis name="term" title={termTitle} label={termLabel}/>
                        <Coord transpose={true}></Coord>
                        <Legend position="top" dy={-20} />
                        <Tooltip />
                        <Geom type="interval" active={true} position="term*count" color="term" />
                    </Chart>
                </div>
            )
        }
        else{
            return (
                <>
                    <Spin></Spin>
                </>)

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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HotResearch);

