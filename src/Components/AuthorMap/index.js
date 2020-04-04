import React from 'react';
import { connect } from 'react-redux';
import './index.css'
import echarts from 'echarts/lib/echarts';
import graph from 'echarts/lib/chart/graph';
import { CloseCircleTwoTone } from '@ant-design/icons';

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
        this.chart.hideLoading();
        this.props.nodes && this.props.edges && this.chart.setOption({
            title: {
                text: 'Author Map'
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 100,
                        // edgeLength: 50
                    },
                    nodes: this.props.nodes.map(function (node) {
                        return {
                            id: node.id,
                            name: node.name,
                            symbolSize: 30,
                            // itemStyle: {
                            //     color: node.color
                            // }
                        };
                    }),
                    edges: this.props.edges.map(function (edge) {
                        return {
                            source: edge.source+'',
                            target: edge.target+'',
                            value: edge.value * 100
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
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },
                    lineStyle: {
                        width: 4,
                        type: 'solid',
                        color: 'source',
                        curveness: 0.7
                    },
                    emphasis: {
                        lineStyle: {
                            width: 2
                        }
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
                        twoToneColor='#1da57a'
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