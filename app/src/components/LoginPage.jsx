import React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import '../styles/login-layout.less';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    this.props.history.push('/posts');
  }

  render() {
    return (
      <div id='content' className='login-layout'>
        <div className='site-title'>
          <h1 className='header'>Posts</h1>
        </div>
        <LoginFormContainer onLogin={this.onLogin} />
      </div>
    );
  }
}