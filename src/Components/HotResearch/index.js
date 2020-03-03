import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { search} from './action';
import './hotSearch.css'


class HotResearch extends React.Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data[0] !== this.props.data[0] || nextProps.loading !== this.props.loading;
    }

    // 监听页面滑动的事件
    // 当页面下拉时，向后端请求流行词数据
    // 同时解绑数据
    scrollHandler = this.handleScroll.bind(this);

    componentDidMount() {
      window.addEventListener('scroll', this.scrollHandler);
    }

    //在componentWillUnmount，进行scroll事件的注销
    componentWillUnmount(){
        window.removeEventListener('scroll', this.bindHandleScroll);
      }

    _handleScroll(scrollTop) {
         //滚动条距离页面的高度
         this.props.searchHot();
         window.removeEventListener('scroll', this.bindHandleScroll);
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop;
        this._handleScroll(scrollTop);
    }

    render() {

          const cols = {
            term: { alias: '研究方向' },
            count: { alias: '词频数' }
          };

          const termTitle = {
            autoRotate: false, // 是否需要自动旋转，默认为 true
            offset: 25, // 设置标题 title 距离坐标轴线的距离
            textStyle: {
              fontSize: '12'
            }, // 坐标轴文本属性配置
            position: 'end'
          }

          const termLabel = {
            offset: 50, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
            rotate: 0, // 文本旋转角度
            // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
            textStyle: {
              textAlign: 'start', // 文本对齐方向，可取值为： start center end
              fontSize: '12', // 文本大小
              fontWeight: 'bold', // 文本粗细
              textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
            },
            autoRotate: false, // 文本是否需要自动旋转，默认为 true
          }          

        if (!this.props.loading) {
            
            return (
                <div className='HotChart' id='chart_container'>
                    <Chart width={700} height={400} data={this.props.data.slice(0,6)} scale={cols}>
                        <Axis name="count" title/>
                        <Axis name="term" title={termTitle} label={termLabel}/>
                        <Coord transpose={true}></Coord>
                        <Legend position="top" dy={-20} />
                        <Tooltip />
                        <Geom type="interval" active={true} position="term*count" color="term" />
                    </Chart>
                </div>
            );
        }
        else{
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HotResearch);

