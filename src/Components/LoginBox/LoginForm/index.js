import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, changeModal } from '../action';


const LoginForm = (props) => {

  const onFinish = values => {
    console.log('Received values of form: ', values);
    props.loginCheck(values);
  };

  const loginCheck1 = ()=>{
    
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="EmailAddress"
        rules={[{ required: true, message: 'Please input your EmailAddress!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="EmailAddress" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {/* <Button type="link" onClick={props.changeModal}>
          忘记密码
        </Button> */}

        {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        {/* <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button> */}
        <Button type="primary" onClick={loginCheck1} className="login-form-button">
          登录
        </Button>
        <Button type="link" onClick={props.changeModal}>
          立刻注册！
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = ({ user }) => {
    return {
        name: user.userName
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginCheck: (values) => {
            dispatch(login(values));
        },
        changeModal: () => {
            dispatch(changeModal(2));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);