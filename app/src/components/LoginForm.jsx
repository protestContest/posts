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
      <form className="vertical-form" onSubmit={this.onSubmit}>
        <div className="inputrow">
          <label className="label">Username</label>
          <input className="text" ref="username" autocapitalize="none" />
        </div>
        <div className="inputrow">
          <label className="label">Password</label>
          <input className="text" ref="password" type="password" />
        </div>
        <div className="submitrow">
          <button className="submit" type="submit">Log in</button>
        </div>
        <div className="info">
          An account will be created if it doesn't exist
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};
