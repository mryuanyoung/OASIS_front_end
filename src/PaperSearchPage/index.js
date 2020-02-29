import React from 'react';
import {Link} from 'react-router-dom';
import './paperSearchPage.css';
import PprSearchRes from '../Components/PprSearchRes/index.js';
import ReSearchBar from '../Components/ReSearchBar/index.js';
import {Layout, Menu, SubMenu} from "antd";
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
                    <Menu.Item key="1"><Link to='/'>首页</Link></Menu.Item>
                    <Menu.Item key="2">搜索</Menu.Item>
                    <Menu.Item key="3">关于我们</Menu.Item>

                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                
                <div style={{ background: '#fff', padding: 24, minHeight: 484 }}>
                    <div className="container" id="container">
                        <ReSearchBar />
                        <PprSearchRes />
                    </div>

                </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Proudly Presented by IDIOTS</Footer>
        </Layout>
    )
}