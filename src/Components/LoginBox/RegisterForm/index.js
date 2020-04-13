import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Form, Input, Button, message, Alert } from 'antd';
import { register, changeModal, verifyEmail, changeError } from '../action';

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


class RegistrationForm extends React.Component {  
  onFinish = () => {
    var completed = true;
    const { getFieldProps } = this.props.form;

    let email = getFieldProps('email').value;
    if(!email){
      message.error('请输入邮箱！');
      completed = false;
    }

    let name =  getFieldProps('username').value;
    if(!name){
      message.error('请输入用户名！');
      completed = false;
    }

    let p1 = getFieldProps('password').value;
    let p2 = getFieldProps('repassword').value;
    if(!p1){
      message.error('请输入密码！');
      completed = false;
    }
    else if(p1!==p2){
      message.error('两次密码不一致，请重新填写！');
      completed = false;
    }

    let vc = getFieldProps('verifyCode').value;
    if(!vc){
      message.error('请输入验证码！');
      completed = false;
    }

    let values ={
      username: name,
      password: p1,
      emailAddress: email,
      verifyCode: vc
    }
    console.log('Received values of form: ', values);
    if(completed){
      this.props.registerCheck(values);
    }

  };

  onVerify = (e) => {
    const { getFieldProps } = this.props.form;
    if(getFieldProps('email').value){
      this.props.verifyCheck(getFieldProps('email').value);
    // let btn = e.target;
    // btn.setAttribute("disabled",true);
    message.success('发送成功，请登录邮箱查看验证码！');
    }
    else{
      message.error('发送失败，请输入邮箱！');
    }
  }

  render() {
    const { getFieldProps} = this.props.form;
    return (
      <div>
        <h1>注册</h1>
        <div>
          邮箱: 
          <Input {...getFieldProps('email')} type="email" placeholder="EmailAddress" required/>
        </div>
        <div>
          密码: 
          <Input
            {...getFieldProps('password')}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          再次输入密码: 
          <Input
            {...getFieldProps('repassword')}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          用户名: 
          <Input {...getFieldProps('username')} placeholder="username" required/>
        </div>
        <div>
          验证码: 
          <Input {...getFieldProps('verifyCode')} placeholder="verifyCode" required/>
          <Button type="primary" onClick={this.onVerify}>
            获取验证码
         </Button>
         <ErrorInfo {...this.props}></ErrorInfo>
        </div>
        
        <Button type="primary" onClick={this.onFinish}>
          注册
         </Button>
         <Button type="link" onClick={this.props.changeModal}>
          已有账号，立即登录
         </Button>

      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
      name: user.userName,
      errorInfo: user.errorInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      registerCheck: (values) => {
          dispatch(register(values));
      },
      verifyCheck: (email) => {
        dispatch(verifyEmail(email));
      },
      changeModal: () => {
          dispatch(changeModal(1));
      },
      changeError: (str) => {
          dispatch(changeError(str));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegistrationForm));