import React, { PropTypes } from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    if (!this.state.disabled) {
      this.setState({ disabled: true });
      this.props.showError('');

      const username = this.refs.username.value;
      const password = this.refs.password.value;

      this.props.login(username, password)
        .catch((error) => {
          this.setState({ disabled: false });
          if (error.status === 401) this.props.showError('Wrong password');
          else this.props.showError('Login failed');
        });
    }

    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  render() {
    const message = (window.navigator.standalone)
      ? <p>An account will be created if it doesn't exist</p>
      : (
        <div>
          Posts works better when you add it to your home screen, through the "share" menu.<br/>
          <br/>
          <i className='fa fa-2x fa-arrow-down'></i>
        </div>
      );

    return (
      <form className="vertical-form" onSubmit={this.onSubmit}>
        <div className="inputrow">
          <label className="label">Username</label>
          <input className="text" ref="username" autoCapitalize="none" />
        </div>
        <div className="inputrow">
          <label className="label">Password</label>
          <input className="text" ref="password" type="password" />
        </div>
        <div className="submitrow">
          <button className="submit" type="submit">Log in</button>
        </div>
        <div className="info">
          {message}
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired
};
