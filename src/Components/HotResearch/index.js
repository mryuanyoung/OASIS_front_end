import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { search} from './action';



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
         console.log(scrollTop)
         //滚动条距离页面的高度
         this.props.searchHot();
         window.removeEventListener('scroll', this.bindHandleScroll);
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop;
        this._handleScroll(scrollTop);
    }

    render() {
        // const data = [
        //     { term: '巴西', count: 18203 },
        //     { term: '印尼', count: 23489 },
        //     { term: '美国', count: 29034 },
        //     { term: '印度', count: 104970 },
        //     { term: '中国', count: 131744 }
        //   ];

          const cols = {
            term: { alias: '研究方向' },
            count: { alias: '词频数' }
          };

        if (!this.props.loading) {
            
            return (
                <div className='HotChart' id='chart_container'>
                    <Chart width={600} height={500} data={this.props.data} scale={cols}>
                        <Axis name="count" title/>
                        <Axis name="term" title/>
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

