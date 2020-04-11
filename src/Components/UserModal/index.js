import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal, Button } from 'antd';
import  LoginBox  from "../LoginBox"
import { changeLoginState } from '../LoginBox/action';

const UserInfo = function(props){
  if(!props.loginState){
    return(
      <LoginBox />
    )
  }
  else{
    return(
      <>
        <p>你好，{props.userName}</p>
        <Button type="primary" onClick={props.changeLoginState}>注销</Button>
      </>
      
      
    )
  }
}

class UserModal extends React.Component {
  

  render() {
    return (
      <div>
        <UserInfo {...this.props}/>
        
      </div>
    );
  }
}

  
const mapStateToProps = ({ user }) => {
  return {
      loginState : user.loginState,
      userName : user.userName
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      changeLoginState: (values) => {
          dispatch(changeLoginState(values));
      }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserModal));
;
