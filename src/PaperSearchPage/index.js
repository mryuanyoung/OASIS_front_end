import React, { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import './paperSearchPage.css';
import { Layout, Menu, Spin } from "antd";
import SimpleInfo from '../Components/SimpleInfo/index'

const DetailInfo = lazy(() => import('../Components/DetailInfo/index'));
const TeamInfo = lazy(() => import('../Components/TeamInfo'));
const DataSupport  = lazy(() => import('../Components/DataSupport/index'));
const Rank = lazy(() => import('../Components/Rank'));

const { Header, Content, Footer } = Layout;



const SearchPage = (props) => {
    let pathname = window.location.pathname.split('/');
    let selected = '2';
    if(pathname.length === 2){
        switch(pathname[1]){
            case 'rank':
                selected = '3';
                break;
            case 'data':
                selected = '4';
                break;
            case 'team':
                selected = '5';
                break;
            default:
                break;
        }
    }

    return (
        <Layout>
            <Header>
                <div className="logo" >
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[selected]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to='/'>首页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={`/${props.method}`}>搜索</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/rank'>排行榜</Link></Menu.Item>
                    <Menu.Item key="4"><Link to='/data'>数据支持</Link></Menu.Item>
                    <Menu.Item key="5"><Link to='/team'>关于我们</Link></Menu.Item>

                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>

                <div className='back'>
                    <div className="searchRes">
                        <Suspense fallback={<Spin></Spin>}>
                            <Switch>
                                <Route exact path='/team' component={TeamInfo}></Route>
                                <Route exact path={['/paper', '/author', '/conference', '/institution']} component={SimpleInfo}></Route>
                                <Route exact path='/rank' component={Rank}></Route>
                                <Route path='/:method/detail' component={DetailInfo}></Route>
                                <Route exact path='/data' component={DataSupport}></Route>
                            </Switch>
                        </Suspense>
                    </div>
                </div>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Proudly Presented by IDIOTS</Footer>
        </Layout>
    )
}

const mapStateToProps = ({ search }) => {
    return {
        method: search.method[0]
    };
}

export default connect(mapStateToProps)(SearchPage);