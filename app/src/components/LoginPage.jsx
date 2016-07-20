import React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import '../styles/login-layout.less';

export default class Loginpage extends React.Component {
  render() {
    return (
      <div id='content' className='login-layout'>
        <div className='site-title'>
          <h1 className='header'>Posts</h1>
        </div>
        <LoginFormContainer />
      </div>
    );
  }
}