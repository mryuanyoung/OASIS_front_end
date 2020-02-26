import React from 'react';
import './paperSearchPage.css';
import PprSearchRes from '../Components/PprSearchRes/index.js';
import ReSearchBar from '../Components/ReSearchBar/index.js';
import {Layout, Menu} from "antd";
const { Header, Content, Footer } = Layout;

export default function (props) {
    return (

        <Layout>
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">首页</Menu.Item>
                    <Menu.Item key="2">推荐</Menu.Item>
                    <Menu.Item key="3">关于我们</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <ReSearchBar></ReSearchBar>
                    <div className="container" id="container">
                        <PprSearchRes oldKeyword={props.oldKeyword}></PprSearchRes>{/*SearchRes的内容应该是空的，等待查询结果返回之后渲染*/}
                    </div>

                </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Proudly Presented by IDIOTS</Footer>
        </Layout>
    )
}