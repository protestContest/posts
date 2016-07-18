import React from 'react';
import LoginForm from './LoginForm';
import '../styles/login-layout.less';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div id='content' className='login-layout'>
        <div className='site-title'>
          <h1 className='header'>Posts</h1>
        </div>
        <LoginForm />
      </div>
    );
  }
}