import React from 'react';
import { connect } from 'react-redux';
import './index.css'
import echarts from 'echarts/lib/echarts';
import graph from 'echarts/lib/chart/graph';
import { CloseCircleTwoTone } from '@ant-design/icons';

// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

class AuthorMap extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.chart = null;
    }

    componentDidMount(){
        this.chart = echarts.init(this.ref.current);
    }

    componentDidUpdate() {
        this.props.nodes && this.chart.setOption({
            title: {
                text: 'Author Map'
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    // progressiveThreshold: 700,
                    data: this.props.nodes.map(function (node) {
                        return {
                            id: node.id,
                            name: node.name,
                            symbolSize: node.degree,
                            // itemStyle: {
                            //     color: node.color
                            // }
                        };
                    }),
                    edges: this.props.edges.map(function (edge) {
                        return {
                            source: edge.source,
                            target: edge.target
                        };
                    }),
                    emphasis: {
                        label: {
                            position: 'right',
                            show: true
                        }
                    },
                    roam: true,
                    focusNodeAdjacency: true,
                    lineStyle: {
                        width: 0.5,
                        curveness: 0.3,
                        opacity: 0.7
                    }
                }
            ]
        }, true);
    }

    render() {
        return (
            <div className='backBone' style={this.props.scale}>
                <header>
                    <CloseCircleTwoTone
                        style={{ fontSize: '20px' }}
                        onClick={e => {
                            this.props.setCover({ visibility: 'hidden' })
                            this.props.setScale({ transform: 'scale(0)' })
                        }} />
                </header>
                <section>
                    <div ref={this.ref} className='chart'></div>
                </section>
                <footer>

                </footer>
            </div>
        )
    }
}

const mapStateToProps = ({ detail }) => {
    if (detail.image) {
        return {
            nodes: detail.image.relateAuthors,
            edges: detail.image.links
        }
    }
}

export default connect(mapStateToProps)(AuthorMap);