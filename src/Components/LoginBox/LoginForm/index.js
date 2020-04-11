import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, changeModal, changeEmail } from '../action';


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
      <div>
        <h1>登录</h1>
        <div>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} {...getFieldProps('email')} placeholder="EmailAddress"/>
        </div>
        <div>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            {...getFieldProps('password')}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <Button type="primary" onClick={this.onFinish} className="login-form-button">
            登录
          </Button>
          <Button type="link" onClick={this.props.changeModal}>
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
      }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));

// const LoginForm = (props) => {
//   const onFinish = values => {
//     console.log('Received values of form: ', values.target);
//     console.log('email', props.email);
//     //props.loginCheck(values);
//   };


//   return (
//     <Form
//       name="normal_login"
//       className="login-form"  
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         name="EmailAddress"
//         rules={[{ required: true, message: 'Please input your EmailAddress!' }]}
//       >
//         <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={email => props.changeEmail(email)} placeholder="EmailAddress" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[{ required: true, message: 'Please input your Password!' }]}
//       >
//         <Input
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           placeholder="Password"
//         />
//       </Form.Item>
//       <Form.Item>
//         <Form.Item name="remember" valuePropName="checked" noStyle>
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>
//         {/* <Button type="link" onClick={props.changeModal}>
//           忘记密码
//         </Button> */}

//         {/* <a className="login-form-forgot" href="">
//           Forgot password
//         </a> */}
//       </Form.Item>

//       <Form.Item>
//         {/* <Button type="primary" htmlType="submit" className="login-form-button">
//           登录
//         </Button> */}
//         <Button type="primary" onClick={onFinish} className="login-form-button">
//           登录
//         </Button>
//         <Button type="link" onClick={props.changeModal}>
//           立刻注册！
//         </Button>
//         {/* Or <a href="">register now!</a> */}
//       </Form.Item>
//     </Form>
//   );
// };

// const mapStateToProps = ({ user }) => {
//     return {
//         name: user.userName,
//         email : user.emailAddress,
//         password: user.password
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loginCheck: (values) => {
//             dispatch(login(values));
//         },
//         changeModal: () => {
//             dispatch(changeModal(2));
//         },
//         changeEmail: (email) => {
//           dispatch(changeEmail(email));
//       }
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
// export default LoginForm;