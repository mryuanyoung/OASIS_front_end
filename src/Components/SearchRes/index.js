import React, {useState} from 'react';
import { connect } from 'react-redux';
import { sortRes } from '../SearchBar/action';
import { List, Icon, Button } from 'antd';
import './searchRes.css';

const fields = ['title', 'year', 'cited'];

const Header = (props) => {
    
    const [orders, setOrders] = useState(fields.reduce((prev, curr) => {
        prev[curr] = false;
        return prev;
    }, {}));

    return (
        <div className='headers'>
            {
                fields.map(item => (
                    <Button className='header' type='dashed' key={item} onClick={() => {
                        props.sortData(item, orders[item]);
                        setOrders({...orders, [item]: !orders[item]});
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


const SearchRes = (props) => {
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
                renderItem={item => (
                    <List.Item 
                        key={item.title}
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.res
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sortData: (field, order) => {
            dispatch(sortRes(field, order));
        }
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SearchRes));