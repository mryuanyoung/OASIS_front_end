import React from 'react';
import { connect } from 'react-redux';
import { Descriptions, List } from 'antd';
import PaperType from '../PaperSimpleInfo/index.js';
import echarts from 'echarts/lib/echarts';
import pie from 'echarts/lib/chart/pie';
import { getRequest } from '../../utils/ajax';
import './index.css';

class InsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.chart = null;
    }

    componentDidMount() {
        this.chart = echarts.init(this.ref.current);
        (async () => {
            const url = `/institution/keywordImage/${this.props.id}`
            try {
                let response = await getRequest(url);
                response = JSON.parse(response);
                if (response.success && response.content) {
                    this.chart.setOption({
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
                                data: response.content.map(item => ({
                                    value: item.percent,
                                    name: item.keyword
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
            catch (err) {
                console.error(err);
            }
        })();
    }

    render() {
        return (
            <>
                <div>
                    <Descriptions title={this.props.institutionName}>
                        <Descriptions.Item label="机构中学者" span={2}>{this.props.authorNameList.join(" | ")}</Descriptions.Item>
                        <Descriptions.Item label="研究方向" span={2}>{this.props.keywords.join(" | ")}</Descriptions.Item>
                    </Descriptions>
                    <div className='keywordImage' ref={this.ref}>

                    </div>
                </div>
                <div className='paperList'>
                    <List
                        header="机构发表的论文"
                        itemLayout="vertical"
                        size="middle"
                        pagination={{
                            pageSize: 5,
                        }}
                        dataSource={this.props.simplePaperVOList}
                        renderItem={item => <PaperType {...item} />}
                    />
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ detail }) => {
    return {
        id: detail.res.requestId
    }
}

export default connect(mapStateToProps)(InsInfo);