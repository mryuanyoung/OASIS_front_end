import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, changeModal, changeEmail, changeError } from '../action';
import './loginForm.css'

const ErrorInfo = (props) =>{
  const onClose = e => {
    props.changeError('');
  };

  if(props.errorInfo){
    return(
      <Alert
      message={props.errorInfo}
      type="error"
      closable
      showIcon
      onClose={onClose}
      />
    )
  }
  else{
    return(
      <p></p>
    )
  }
}

class LoginForm extends React.Component {  
  onFinish = () => {
    const { getFieldProps } = this.props.form;
        let values ={
          emailAddress: getFieldProps('email').value,
          passWord: getFieldProps('password').value
        }
        console.log('Received values of form: ', values);
        this.props.loginCheck(values);
      };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className='login_area'>
        <h1>登录</h1>
          <div className='login_item'>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} {...getFieldProps('email')} placeholder="EmailAddress"/>
          </div>
          <div className='login_item'>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              {...getFieldProps('password')}
              type="password"
              placeholder="Password"
            />
            <ErrorInfo {...this.props}></ErrorInfo>
          </div>
          <div className='login_item'>
            <Button className='login_btn' type="primary" onClick={this.onFinish}>
              登录
            </Button>
            <Button className='register_btn' type="link" onClick={this.props.changeModal}>
              立刻注册！
            </Button>
          </div>

      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
    return {
        name: user.userName,
        email : user.emailAddress,
        password: user.password
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginCheck: (values) => {
            dispatch(login(values));
        },
        changeModal: () => {
            dispatch(changeModal(2));
        },
        changeEmail: (email) => {
          dispatch(changeEmail(email));
        },
        changeError: (str) => {
            dispatch(changeError(str));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));

