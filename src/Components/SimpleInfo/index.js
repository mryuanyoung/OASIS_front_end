import React, { useState } from 'react';
import {connect} from 'react-redux';
import PaperType from '../PaperSimpleInfo/index.js';
import AuthorType from '../AuthorSimpleInfo';
import InstitutionType from '../InsSimpleInfo';
import { sortRes } from '../SearchBar/action';
import { List, Icon, Button} from 'antd';

const fields = ['title', 'year', 'cited'];

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
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data[0] !== this.props.data[0];
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
            case 'insititution':
                return (
                    <InstitutionType {...item} />
                )
        }
    }

    render() {
       return (
            <div className='dataList'>
                <List
                    header={<Header sortData={this.props.sortData}></Header>}
                    itemLayout="vertical"
                    size="middle"
                    pagination={{
                        pageSize: 5,
                    }}
                    dataSource={this.props.data}
                    renderItem={this.renderList.bind(null, this.props.method)}/*跟数据类型动态改变list的内容*/
                />
            </div>
        )
    }
}

const mapStateToProps = ({search}) => {
    return {
        data: search.res,
        method: search.method
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

