import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sortRes } from '../SearchBar/action';
import { List, Icon, Button, Layout, Menu} from 'antd';
import PaperType from '../PaperSimpleInfo/paperSimpleInfo.js';
import AuthorType from '../AuthorSimpleInfo/authorSimpleInfo.js';
import InstitutionType from '../InsSimpleInfo/insSimpleInfo.js';
import './pprSearchRes.css';

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


const PprSearchRes = (props) => {

    return (
        <div className='dataList'>
            <List
                header={<Header sortData={props.sortData}></Header>}
                itemLayout="vertical"
                size="middle"
                pagination={{
                    pageSize: 5,
                }}
                dataSource={props.data}
                renderItem={renderList.bind(null, props.method)}/*跟数据类型动态改变list的内容*/
            />
        </div>
    )
}

function renderList(method, item) {
    switch (method) {
        case 'author':
            return (
                <AuthorType {...item}/>
            );
        case 'paper':
            return (
                <PaperType {...item} />
            );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.res,
        method: state.method
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sortData: (field, order) => {
            dispatch(sortRes(field, order));
        }
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(PprSearchRes));