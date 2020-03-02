import React from 'react';
import { Card, Col, Row } from 'antd';
import  './teamInfo.css'

const { Meta } = Card;

const TeamMateInfo = function (props) {
    return(
        <Card cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
           hoverable bordered={false}>
            <Meta title={props.name} description="stay hungry, stay fool">
                {props.job}
            </Meta>
        </Card>
    )
  }


const TeamInfo = function (props) {
    return(
        <>
            <h1 className="teamName">IDIOTS</h1>
            <div className="site-card-wrapper">
                <Row gutter={32}>
                <Col span={16}>
                    <TeamMateInfo name="陈立" job="后端工程师" />
                </Col>
                <Col span={16}>
                    <TeamMateInfo name="邰天成" job="后端工程师" />
                </Col>
                <Col span={16}>
                    <TeamMateInfo name="袁洋" job="前端工程师" />
                </Col>
                <Col span={16}>
                    <TeamMateInfo name="江山" job="前端工程师" />
                </Col>
                </Row>
            </div>
        </>
    )
  }


  export default TeamInfo;