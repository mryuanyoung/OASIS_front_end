import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Chart } from '@antv/g2';




class HotResearch extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data[0] !== this.props.data[0] || nextProps.loading !== this.props.loading;
    }


    render() {
        // const data = [
        //     { term: '巴西', count: 18203 },
        //     { term: '印尼', count: 23489 },
        //     { term: '美国', count: 29034 },
        //     { term: '印度', count: 104970 },
        //     { term: '中国', count: 131744 }
        //   ];
          
          const chart = new Chart({
            container: 'chart_container',
            autoFit: true,
            height: 500,
          });

        if (!this.props.loading) {
            chart.data(this.props.data);
            chart.scale('population', { nice: true });
            chart.coordinate().transpose();
            chart.tooltip({
            showMarkers: false
            });
            chart.interaction('active-region');
            chart.interval().position('term*count');
            chart.render();
            return (
                <div className='HotChart' id='chart_container'>
                    
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


export default connect(mapStateToProps, null)(HotResearch);

