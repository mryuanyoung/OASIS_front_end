import React, { useState } from 'react';
import { connect } from 'react-redux';
import PaperType from '../PaperSimpleInfo/index.js';
import AuthorType from '../AuthorSimpleInfo';
import InstitutionType from '../InsSimpleInfo';
import SearchBar from '../SearchBar/index';
import { sortRes } from '../SearchBar/action';
import { List, Icon, Button, Spin } from 'antd';

const fields = ['title', 'year', 'cited'];
// const PaperType=React.lazy(()=>import('../PaperSimpleInfo/index.js'));
// const AuthorType=React.lazy(()=>import('../AuthorSimpleInfo'));
// const InstitutionType=React.lazy(()=>import('../InsSimpleInfo'));

const Header = (props) => {

    //管理keyword排序次序：顺序/反序
    const [orders, setOrders] = useState(fields.reduce((prev, curr) => {
        prev[curr] = false;
        return prev;
    }, {}));


    return (
        <div className='cataheaders'>
            {
                fields.map(item => (

                    <Button className='header' type='dashed' key={item} onClick={() => {
                        //点击事件 1. 调用action方法排序 2. 改变该keyword的排序次序
                        props.sortData(item, orders[item]);
                        setOrders({ ...orders, [item]: !orders[item] });
                    }}>
                        <span className='field'>{item}</span>
                        <div className='upDown'>
                            <Icon type='up' />
                            <Icon type='down' />
                        </div>
                    </Button>
                ))
            }
        </div>
    )
}

class DataList extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data[0] !== this.props.data[0] || nextProps.loading !== this.props.loading;
    }

    renderList(method, item) {
        switch (method) {
            case 'author':
                return (
                    <AuthorType {...item} />
                );
            case 'paper':
                return (
                    <PaperType {...item} />
                );
            case 'institution':
                return (
                    <InstitutionType {...item} />
                )
            default:

        }
    }

    render() {
        if (!this.props.loading) {
            return (
                <div>
                    <SearchBar />
                    {/* <Button>在结果中检索</Button> */}
                    <div className='dataList'>
                        <List
                            header={<Header sortData={this.props.sortData}></Header>}
                            itemLayout="vertical"
                            size="middle"
                            pagination={{
                                pageSize: 10,
                                hideOnSinglePage: true,
                                onChange: () => document.documentElement.scrollTop = 0
                            }}
                            dataSource={this.props.data}
                            renderItem={this.renderList.bind(null, this.props.method)}/*跟数据类型动态改变list的内容*/
                        />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <SearchBar />
                    <Spin></Spin>
                    {/* <Button>在结果中检索</Button> */}
                </div>
            );
        }
    }
}

const mapStateToProps = ({ search }) => {
    return {
        data: search.res,
        method: search.method[0],
        loading: search.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sortData: (field, order) => {
            dispatch(sortRes(field, order));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataList);

