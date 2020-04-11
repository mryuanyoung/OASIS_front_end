import React from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'antd';
import  RegistrationForm  from './RegisterForm'
import LoginForm from './LoginForm'
import './loginBox.css'
import { changeLoginState, changeModal } from './action';

class LoginBox extends React.Component {
    
    onCancle =() =>{
      this.props.changeLoginState();
      this.props.changeModal();
    }

    render() {
      if(this.props.currentModal===1){
        return (
         <LoginForm></LoginForm>
        );
      }
      else if(this.props.currentModal===2){
        return(
          <RegistrationForm></RegistrationForm>
        )
      }
      else{
        return(
          <>
            <Alert
              message="成功"
              description="欢迎回来，开始你的学术探索之旅把！"
              type="success"
              showIcon
            />
            <Button type="primary" onClick={this.onCancle}>
              继续
            </Button>
          </>
        )
      }
        
    }

}
  
const mapStateToProps = ({ user }) => {
    return {
        name: user.userName,
        currentModal : user.modal
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      changeLoginState: (values) => {
          dispatch(changeLoginState(values));
      },
      changeModal: () => {
        dispatch(changeModal(1));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginBox);