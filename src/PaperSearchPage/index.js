import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import './paperSearchPage.css';
import PprSearchRes from '../Components/PprSearchRes/index.js';
import SearchBar from '../Components/SearchBar/index.js';
import {Layout, Menu, Button} from "antd";
const { Header, Content, Footer } = Layout;


const SearchPage = (props) => {
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
                        <div>
                            <SearchBar />
                            <Button>在结果中检索</Button>
                        </div>
                        <Switch>
                            <Route exact path='/:method' component={PprSearchRes}></Route>
                            <Route exact path='/:method/detail' component={<div>hello</div>}></Route>
                        </Switch>
                    </div>
                </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Proudly Presented by IDIOTS</Footer>
        </Layout>
    )
}

export default SearchPage;