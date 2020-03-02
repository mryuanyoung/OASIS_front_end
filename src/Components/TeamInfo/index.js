import React from 'react';
import { Card, Col, Row, Avatar } from 'antd';
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
            <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} 
                title={props.name} description={props.job}>
            </Meta>
        </Card>
    )
  }


const TeamInfo = function (props) {
    return(
        <>
            <h1 className="teamName">IDIOTS</h1>
            <h4 className="slogen">团队口号 ： Stay hungry，stay fool.</h4>
            <div className="site-card-wrapper">
                <Row gutter={12}>
                <Col span={6}>
                    <TeamMateInfo name="陈立" job="后端工程师" />
                </Col>
                <Col span={6}>
                    <TeamMateInfo name="邰天成" job="后端工程师" />
                </Col>
                <Col span={6}>
                    <TeamMateInfo name="袁洋" job="前端工程师" />
                </Col>
                <Col span={6}>
                    <TeamMateInfo name="江山" job="前端工程师" />
                </Col>
                </Row>
            </div>
        </>
    )
  }


  export default TeamInfo;