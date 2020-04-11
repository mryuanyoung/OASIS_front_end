import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Modal, Button } from 'antd';
import  LoginBox  from "../LoginBox"

const UserInfo = function(props){
  if(!props.loginState){
    return(
      <LoginBox />
    )
  }
  else{
    return(
      <p>{props.userName}</p>
    )
  }
}

class UserModal extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible} = this.state;
    return (
      <div>
        <Button type="link" onClick={this.showModal}>
          登录
        </Button>
        <Modal
          title="login"
          visible={visible}
          onCancel={this.handleCancel}
        >
        
          <UserInfo {...this.props}/>
        </Modal>
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


export default withRouter(connect(mapStateToProps, null)(UserModal));
;
