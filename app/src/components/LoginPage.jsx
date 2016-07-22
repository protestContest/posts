import React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import '../styles/login-layout.less';
import '../styles/site-title.less';
import '../styles/vertical-form.less';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { location } = this.props;
    if (location.state && location.state.nextPathname) {
      this.props.history.push(location.state.nextPathname);
    } else {
      this.props.history.push('/posts');
    }
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