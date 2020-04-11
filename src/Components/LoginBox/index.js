import React from 'react';
import { connect } from 'react-redux';
import  RegistrationForm  from './RegisterForm'
import LoginForm from './LoginForm'
import './loginBox.css'

class LoginBox extends React.Component {
    

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
          <p>success!</p>
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

export default connect(mapStateToProps,null)(LoginBox);