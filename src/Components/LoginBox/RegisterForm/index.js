import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Form, Input, Button, message, Alert } from 'antd';
import { register, changeModal, verifyEmail,changeError } from '../action';

const ErrorInfo = (props) =>{
  const onClose = e => {
    props.changeError();
  };

  if(props.errorInfo){
    console.log(props.errorInfo);
    return(
      <Alert
      message="注册失败"
      description="验证码错误，请重新获得，或确认大小写"
      type="error"
      closable
      onClose={onClose}
      />
    )
  }
  else{
    console.log(props.errorInfo);
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
    this.props.verifyCheck(getFieldProps('email').value);
    // let btn = e.target;
    // btn.setAttribute("disabled",true);
    message.success('发送成功，请登录邮箱查看验证码！');
  }

  render() {
    const { getFieldProps} = this.props.form;
    return (
      <div>
        <h1>注册</h1>
        <div>
          邮箱: 
          <Input {...getFieldProps('email')} placeholder="EmailAddress" required/>
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
          <Input {...getFieldProps('verifyCode')} placeholder="请输入验证码" required/>
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
      changeError: () => {
          dispatch(changeError());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegistrationForm));


// const RegistrationForm = (props) => {

//   const onFinish = values => {
//     console.log('Received values of form: ', values);
//     this.props.registerCheck(values);
//   };  

//   return (
//     <Form
//       {...formItemLayout}
//       name="register"
//       onFinish={onFinish}
//       scrollToFirstError
//     >
//       <Form.Item
//         name="email"
//         label="E-mail"
//         rules={[
//           {
//             type: 'email',
//             message: 'The input is not valid E-mail!',
//           },
//           {
//             required: true,
//             message: 'Please input your E-mail!',
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name="password"
//         label="Password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your password!',
//           },
//         ]}
//         hasFeedback
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item
//         name="confirm"
//         label="Confirm Password"
//         dependencies={['password']}
//         hasFeedback
//         rules={[
//           {
//             required: true,
//             message: 'Please confirm your password!',
//           },
//           ({ getFieldValue }) => ({
//             validator(rule, value) {
//               if (!value || getFieldValue('password') === value) {
//                 return Promise.resolve();
//               }
//               return Promise.reject('The two passwords that you entered do not match!');
//             },
//           }),
//         ]}
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item
//         name="nickname"
//         label={
//           <span>
//             Nickname&nbsp;
//             <Tooltip title="What do you want others to call you?">
//               <QuestionCircleOutlined />
//             </Tooltip>
//           </span>
//         }
//         rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
//       >
//         <Input />
//       </Form.Item>

//       {/* <Form.Item
//         name="agreement"
//         valuePropName="checked"
//         rules={[
//           { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
//         ]}
//         {...tailFormItemLayout}
//       >
//         <Checkbox>
//           I have read the <a href="">agreement</a>
//         </Checkbox>
//       </Form.Item> */}
//       <Form.Item {...tailFormItemLayout}>
//         <Button type="primary" htmlType="submit">
//           注册
//         </Button>
//         <Button type="link" onClick={props.changeModal}>
//           已有账号，立即登录
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };