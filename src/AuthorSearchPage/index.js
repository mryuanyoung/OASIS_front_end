import React from 'react';
import './paperSearchPage.css';
import SearchRes from '../Components/SearchRes/index.js';
import SearchBar from '../Components/SearchBar/index.js';
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
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <SearchBar></SearchBar>
                    <div className='container'>
                        <SearchRes></SearchRes>
                    </div>

                </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Proudly Presented by IDIOTS</Footer>
        </Layout>
    )
}