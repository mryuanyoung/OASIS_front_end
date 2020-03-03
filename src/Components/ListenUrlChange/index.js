import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Listener extends React.Component{
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(){
        return false;
    }

    componentDidMount(){
        console.log(this.props);
        //todo
        //监听url变化，只要是跳转到detail界面的，都将url存入redux
    }

    render(){
        return null;
    }
}

export default withRouter(connect()(Listener)) ;