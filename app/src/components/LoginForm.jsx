import React, { PropTypes } from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.login(username, password);

    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  render() {
    return (
      <div className="vertical-form">
        <div className="inputrow">
          <label className="label">Username</label>
          <input className="text" ref="username" />
        </div>
        <div className="inputrow">
          <label className="label">Password</label>
          <input className="text" ref="password" type="password" />
        </div>
        <div className="submitrow">
          <button className="submit" type="button" onClick={this.onSubmit}>Log in</button>
        </div>
        <div className="bonuslink">
          <a href='/join'>Sign up</a>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};
