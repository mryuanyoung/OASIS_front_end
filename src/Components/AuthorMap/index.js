import React from 'react';
import { connect } from 'react-redux';
import './index.css'
import echarts from 'echarts/lib/echarts';
import graph from 'echarts/lib/chart/graph';
import tooltip from 'echarts/lib/component/tooltip';
import { CloseCircleTwoTone } from '@ant-design/icons';

// require('echarts/lib/component/title');

class AuthorMap extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.chart = null;
    }

    componentDidMount() {
        this.chart = echarts.init(this.ref.current);
    }

    componentDidUpdate() {
        this.chart.hideLoading();
        this.props.nodes && this.props.edges && this.chart.setOption({
            title: {
                text: 'Author Map',
                fontWeight: 100
            },
            tooltip: {},
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 200,
                        edgeLength: 200
                    },
                    nodes: this.props.nodes.map(function (node) {
                        return {
                            id: node.id,
                            name: node.name,
                            symbolSize: (node.degree / 30) >= 1 ? 30 : node.degree,
                            degree: node.degree,
                            tooltip: {
                                formatter: ({ data, dataType }) => {
                                    if (dataType === 'node') {
                                        return `${data.name}: ${data.degree}`;
                                    }
                                    else if (dataType === 'edge') {
                                        return `link count: ${data.value}`
                                    }
                                }
                            },
                            itemStyle: {
                                color: `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, 0.5)`
                            }
                        };
                    }),
                    edges: this.props.edges.map(function (edge) {
                        return {
                            source: edge.source + '',
                            target: edge.target + '',
                            value: edge.value
                        };
                    }),
                    emphasis: {
                        label: {
                            position: 'right',
                            show: true
                        }
                    },
                    roam: false,
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
                        width: 2,
                        type: 'solid',
                        color: 'source',
                        curveness: 0.7
                    },
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    },
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