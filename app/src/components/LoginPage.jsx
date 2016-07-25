import React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import Spinner from './Spinner';
import '../styles/login-layout.less';
import '../styles/site-title.less';
import '../styles/vertical-form.less';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
    this.onLogin = this.onLogin.bind(this);
    this.showError = this.showError.bind(this);
  }

  onLogin() {
    const { location } = this.props;
    if (location.state && location.state.nextPathname) {
      this.props.history.push(location.state.nextPathname);
    } else {
      this.props.history.push('/posts');
    }
  }

  showError(error) {
    this.setState({ error });
  }

  render() {
    return (
      <div id='content' className='login-layout'>
        <div className='site-title'>
          <h1 className='header'>Posts</h1>
        </div>
        <div className='info'>
          <Spinner hidden={!this.props.loggingIn} />
          <div className='error'>{this.state.error}</div>
        </div>
        <LoginFormContainer onLogin={this.onLogin} showError={this.showError} />
      </div>
    );
  }
}